package auth

import (
	"context"
	"time"

	"github.com/Basillica/backend/types/requests"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type MongoDBClient struct {
}

// ConnectDB connects to the MongoDB database
func (*MongoDBClient) ConnectDB() (*mongo.Database, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	clientOptions := options.Client().ApplyURI("mongodb://mongo:27017")
	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		return nil, err
	}

	db := client.Database("test-database")
	return db, nil
}

// CreatePerson adds a new person to the database
func (m *MongoDBClient) Create(movie requests.Movie) error {
	db, err := m.ConnectDB()
	if err != nil {
		return err
	}

	movie.Id = primitive.NewObjectID()
	_, err = db.Collection("movies").InsertOne(context.Background(), movie)
	if err != nil {
		return err
	}

	return nil
}

func (m *MongoDBClient) GetAll() ([]requests.Movie, error) {
	db, err := m.ConnectDB()
	if err != nil {
		return []requests.Movie{}, err
	}

	var movies []requests.Movie
	cur, err := db.Collection("movies").Find(context.Background(), bson.M{})
	if err != nil {
		return []requests.Movie{}, err
	}
	defer cur.Close(context.Background())

	for cur.Next(context.Background()) {
		var movie requests.Movie
		err := cur.Decode(&movie)
		if err != nil {
			return []requests.Movie{}, err
		}
		movies = append(movies, movie)
	}
	return movies, nil
}

func (m *MongoDBClient) Filter(str string) ([]requests.Movie, error) {
	db, err := m.ConnectDB()
	if err != nil {
		return []requests.Movie{}, err
	}
	var movies []requests.Movie
	filter := bson.D{{Key: "firstName", Value: bson.D{{Key: "$all", Value: bson.A{str}}}}}
	cur, err := db.Collection("movies").Find(context.Background(), filter)
	if err != nil {
		return []requests.Movie{}, err
	}
	defer cur.Close(context.Background())

	for cur.Next(context.Background()) {
		var movie requests.Movie
		err := cur.Decode(&movie)
		if err != nil {
			return []requests.Movie{}, err
		}
		movies = append(movies, movie)
	}
	return movies, nil
}

func (m *MongoDBClient) FindId(id string) (requests.Movie, error) {
	db, err := m.ConnectDB()
	if err != nil {
		return requests.Movie{}, err
	}

	objID, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		return requests.Movie{}, err
	}

	filter := bson.M{"_id": bson.M{"$eq": objID}}
	movie := requests.Movie{}

	if err := db.Collection("movies").FindOne(context.Background(), filter).Decode(&movie); err != nil {
		return requests.Movie{}, err
	}

	return movie, nil
}

func (m *MongoDBClient) Filter2(v string) (requests.Movie, error) {
	db, err := m.ConnectDB()
	if err != nil {
		return requests.Movie{}, err
	}

	// filter := bson.D{{Key: "foo", Value: 99}}
	// filter = append(filter, bson.E{Key: "bar", Value: bson.D{
	// 		{"$regex", primitive.Regex{Pattern: "^ThisValue.*", Options: "i"}},
	// 	}},
	// )
	// cursor, err := db.Collection("movies").Find(context.Background(), filter)

	filter := bson.D{{Key: "title", Value: primitive.Regex{Pattern: v, Options: "i"}}}
	cur, err := db.Collection("movies").Find(context.Background(), filter)
	if err != nil {
		return requests.Movie{}, err
	}
	defer cur.Close(context.Background())

	return requests.Movie{}, err
}
