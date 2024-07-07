package routes

import (
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
