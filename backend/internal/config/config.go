package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	Port     string
	MongoURI string
}

func LoadConfig(path string) (*Config, error) {

	if err := godotenv.Load(".env"); err != nil {
		log.Fatal("Error loading .env files")
		return nil, err
	}

	var config Config
	config.Port = os.Getenv("PORT")
	config.MongoURI = os.Getenv("MONGOURI")

	return &config, nil
}
