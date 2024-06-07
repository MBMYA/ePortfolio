package database

import (
	"backend/internal/models"
	"context"

	"go.mongodb.org/mongo-driver/mongo"
)

func AddUser(client *mongo.Client, user *models.User) error {
	collection := client.Database("goBackend").Collection("users")
	_, err := collection.InsertOne(context.Background(), user)
	return err
}
