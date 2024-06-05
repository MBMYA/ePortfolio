package models

type Metadata struct {
	Username            string   `json:"username"`
	Picture             string   `json:"picture"`
	Projects            []string `json:"projects"`
	Biography           string   `json:"biography"`
	ProjectsDescription []string `json:"projectDescription"`
}
