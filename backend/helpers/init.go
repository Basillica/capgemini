package helpers

import (
	"encoding/json"
	"io"
	"net/http"
	"os"

	"github.com/Basillica/backend/types/requests"
)

func NewMovie() *movieService {
	return &movieService{
		ApiUrl: os.Getenv("API_URL"),
	}
}

type movieService struct {
	Movie  requests.Movie
	ApiUrl string
}

func (ms *movieService) GetAll() (*requests.Response, error) {
	resp, err := http.Get(ms.ApiUrl)
	if err != nil {
		return &requests.Response{}, err
	}

	if resp.Body != nil {
		defer resp.Body.Close()
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return &requests.Response{}, err
	}

	var responses requests.Response
	if err = json.Unmarshal(body, &responses); err != nil {
		return &requests.Response{}, err
	}
	return &responses, nil
}
