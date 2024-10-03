package models

type experienceCard struct {
	Name        string `json:"name"`
	Title       string `json:"title"`
	StartMonth  string `json:"startMonth"`
	StartYear   string `json:"startYear"`
	EndMonth    string `json:"endMonth"`
	EndYear     string `json:"endYear"`
	City        string `json:"city"`
	Country     string `json:"country"`
	Description string `json:"description"`
}
type Metadata struct {
	Username    string           `json:"username"`
	Fullname    string           `json:"fullname"`
	Picture     string           `json:"picture"`
	Experiences []experienceCard `json:"experiences"`
	Projects    []experienceCard `json:"projects"`
	Biography   string           `json:"biography"`
	Educations  []experienceCard `json:"educations"`
}
