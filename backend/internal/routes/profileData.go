package routes

import (
	"backend/internal/database"
	"backend/internal/models"
	"context"
	"encoding/json"
	"log"
	"net/http"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func GetData(client *mongo.Client) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		username := r.PathValue("username")

		// Add connection names to the dotenv
		collection := client.Database("goBackend").Collection("metadata")

		var userData models.Metadata
		err := collection.FindOne(context.TODO(), bson.M{"username": username}).Decode(&userData)

		if err != nil {
			if err == mongo.ErrNoDocuments {
				http.Error(w, "No available information for user "+username, http.StatusInternalServerError)
			} else {
				log.Println("Error finding data: ", err)
				http.Error(w, "Internal server error", http.StatusInternalServerError)
			}
			return
		}

		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(userData)

	}
}

func CreateData(client *mongo.Client) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req models.Metadata
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		if req.Username == "" {
			http.Error(w, "Username is no given", http.StatusBadRequest)
			return
		}

		// Add connection names to the dotenv
		collection := client.Database("goBackend").Collection("metadata")
		var checkUser models.Metadata

		//Check if the username already used
		err := collection.FindOne(context.TODO(), bson.M{"username": req.Username}).Decode(&checkUser)
		if err == nil {
			http.Error(w, "User data is already available", http.StatusBadRequest)
			return
		} else if err != mongo.ErrNoDocuments {
			log.Println("Error checking for existing user:", err)
			http.Error(w, "Internal server error", http.StatusInternalServerError)
			return
		}

		if err := database.AddData(client, req); err != nil {
			log.Println("Error creating user metadata:", err)
			http.Error(w, "Internal server error", http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(map[string]string{"message": "Data added successfully"})
	}
}
