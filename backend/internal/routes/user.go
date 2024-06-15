package routes

import (
	"backend/internal/database"
	"backend/internal/models"
	"backend/internal/services"
	"context"
	"encoding/json"
	"log"
	"net/http"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type SignInRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type SignUpRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
	Username string `json:"username"`
}

func Signin(client *mongo.Client) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req SignInRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		// Add connection names to the dotenv
		collection := client.Database("goBackend").Collection("users")

		var user models.User
		err := collection.FindOne(context.TODO(), bson.M{"email": req.Email}).Decode(&user)

		if err != nil {
			if err == mongo.ErrNoDocuments {
				http.Error(w, "Invalid Signin", http.StatusUnauthorized)
			} else {
				log.Println("Error finding user: ", err)
				http.Error(w, "Internal server error", http.StatusInternalServerError)
			}
			return
		}

		if !services.CheckHash(req.Password, user.Password) {
			http.Error(w, "Invalid credentials", http.StatusUnauthorized)
			return
		}

		token, err := services.GenerateJWT(user.Email)
		if err != nil {
			log.Println("Error generating token: ", err)
			http.Error(w, "Internal server error", http.StatusInternalServerError)
			return
		}

		http.SetCookie(w, &http.Cookie{
			Name:    "token",
			Value:   token,
			Expires: time.Now().Add(24 * time.Hour),
		})

		w.WriteHeader(http.StatusOK)
		// w.Header().Set("Access-Control-Allow-Origin", "*")
		// w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
		json.NewEncoder(w).Encode(map[string]string{"message": "Signed in successfully"})

	}
}

func Signup(client *mongo.Client) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req SignUpRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		if req.Email == "" {
			http.Error(w, "Email is required", http.StatusBadRequest)
			return
		} else if req.Password == "" {
			http.Error(w, "Password is required", http.StatusBadRequest)
			return
		} else if req.Username == "" {
			http.Error(w, "Username is required", http.StatusBadRequest)
			return
		}

		// Add connection names to the dotenv
		collection := client.Database("goBackend").Collection("users")
		var checkUser models.User

		//Check if the email or username are already used
		err := collection.FindOne(context.TODO(), bson.M{"email": req.Email}).Decode(&checkUser)
		if err == nil {
			http.Error(w, "Email is already used", http.StatusBadRequest)
			return
		} else if err != mongo.ErrNoDocuments {
			log.Println("Error checking for existing user:", err)
			http.Error(w, "Internal server error", http.StatusInternalServerError)
			return
		}
		err = collection.FindOne(context.TODO(), bson.M{"username": req.Username}).Decode(&checkUser)
		if err == nil {
			http.Error(w, "Username is already used", http.StatusBadRequest)
			return
		} else if err != mongo.ErrNoDocuments {
			log.Println("Error checking for existing user:", err)
			http.Error(w, "Internal server error", http.StatusInternalServerError)
			return
		}

		hashedPassword, err := services.HashPassword(req.Password)
		if err != nil {
			log.Println("Error hashing the password:", err)
			http.Error(w, "Internal server error", http.StatusInternalServerError)
			return
		}

		user := &models.User{
			Email:    req.Email,
			Password: hashedPassword,
			Username: req.Username,
		}

		if err := database.AddUser(client, user); err != nil {
			log.Println("Error creating user:", err)
			http.Error(w, "Internal server error", http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(map[string]string{"message": "User created successfully"})
	}
}
