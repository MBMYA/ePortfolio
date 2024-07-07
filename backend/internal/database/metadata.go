package database

import (
	"backend/internal/models"
	"context"

	"go.mongodb.org/mongo-driver/mongo"
)

func AddData(client *mongo.Client, userData models.Metadata) error {
	collection := client.Database("goBackend").Collection("metadata")
	_, err := collection.InsertOne(context.Background(), userData)
	return err
}
