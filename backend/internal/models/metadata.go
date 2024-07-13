package models

type description struct {
	Name      string `json:"name"`
	StartDate string `json:"startDate"`
	EndDate   string `json:"endDate"`
}
type Metadata struct {
	Username          string        `json:"username"`
	Fullname          string        `json:"fullname"`
	Picture           string        `json:"picture"`
	Projects          []description `json:"projects"`
	Biography         string        `json:"biography"`
	ProjectsSummary   []string      `json:"projectsSummary"`
	Educations        []description `json:"educations"`
	EducationsSummary []string      `json:"educationsSummary"`
}
