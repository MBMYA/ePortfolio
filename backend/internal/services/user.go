package services

import (
	"backend/internal/models"
	"context"

	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

// Hash the password to be saved in the database (Signup)
func HashPassword(password string) (string, error) {
	hashedBytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(hashedBytes), err
}

// Check the provided password and the saved hash (Signin)
func CheckHash(password string, hashedPassword string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
	return err == nil
}

func AddUser(client *mongo.Client, user *models.User) error {
	collection := client.Database("goBackend").Collection("users")
	_, err := collection.InsertOne(context.Background(), user)
	return err
}
