package routes

import (
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
		json.NewEncoder(w).Encode(map[string]string{"message": "Signed in successfully"})

	}
}
