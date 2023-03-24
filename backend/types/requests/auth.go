package requests

import "go.mongodb.org/mongo-driver/bson/primitive"

type LoginRequest struct {
	Email    string `json:"email" binding:"required,email,gte=6,lte=100"`
	Password string `json:"password" binding:"required,gte=6,lte=100"`
}

type Movie struct {
	Id           primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Title        string             `json:"title" binding:"required,gte=6,lte=100" bson:"title,omitempty"`
	EpisodeId    int32              `json:"episode_id" binding:"required" bson:"episode_id,omitempty"`
	OpeningCrawl string             `json:"opening_crawl" binding:"required" bson:"opening_crawl,omitempty"`
	Director     string             `json:"director" binding:"required" bson:"director,omitempty"`
	Producer     string             `json:"producer" binding:"required" bson:"producer,omitempty"`
	ReleaseDate  string             `json:"release_date" binding:"required" bson:"release_date,omitempty"`
	Characters   []string           `json:"characters" binding:"required" bson:"characters,omitempty"`
	Planets      []string           `json:"planets" binding:"required" bson:"planets,omitempty"`
	Starships    []string           `json:"starships" binding:"required" bson:"starships,omitempty"`
	Vehicles     []string           `json:"vehicles" binding:"required" bson:"vehicles,omitempty"`
	Species      []string           `json:"species" binding:"required" bson:"species,omitempty"`
	Created      string             `json:"created" bson:"created,omitempty"`
	Edited       string             `json:"edited" bson:"edited,omitempty"`
	Url          string             `json:"url" bson:"url,omitempty"`
}

type Response struct {
	Count    int     `json:"count"`
	Next     string  `json:"next"`
	Previous string  `json:"previous"`
	Results  []Movie `json:"results"`
}
