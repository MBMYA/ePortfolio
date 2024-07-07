package server

import (
	"backend/internal/config"
	"backend/internal/routes"
	"net/http"

	"go.mongodb.org/mongo-driver/mongo"
)

func ServerRouting(cfg *config.Config, client *mongo.Client) *http.ServeMux {
	mux := http.NewServeMux()
	mux.HandleFunc("POST /Signup", routes.Signup(client))
	mux.HandleFunc("POST /Signin", routes.Signin(client))
	mux.HandleFunc("GET /data/{username}", routes.GetData(client))
	mux.HandleFunc("POST /data/create", routes.CreateData(client))
	return mux
}
