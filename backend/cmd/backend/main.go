package main

import (
	"context"
	"log"
	"net/http"
	"time"

	"backend/internal/config"
	"backend/internal/server"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

func main() {
	cfg, err := config.LoadConfig(".env")
	if err != nil {
		log.Fatal("could not load config:", err)
	}

	clientOptions := options.Client().ApplyURI(cfg.MongoURI)
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatal("Cannot connect to MongoDB: ", err)
	}
	defer client.Disconnect(ctx)

	if err := client.Ping(ctx, readpref.Primary()); err != nil {
		log.Fatal("could not ping MongoDB:", err)
	}

	log.Println("Connected to MongoDB!")

	srv := server.ServerRouting(cfg, client)
	log.Println("Starting server on", cfg.Port)
	if err := http.ListenAndServe("localhost:"+cfg.Port, srv); err != nil {
		log.Fatal(err.Error())
	}
}
