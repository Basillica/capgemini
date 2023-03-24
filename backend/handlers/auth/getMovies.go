package auth

import (
	"net/http"

	"github.com/Basillica/backend/helpers"
	"github.com/Basillica/backend/types/requests"
	"github.com/gin-gonic/gin"
)

// GetMovies godoc
//
//	@Summary		fetch movies from the database
//	@Description	endpoint to fetch movies from the database
//	@Tags           movie
//	@Accept		    json
//	@Produce		json
//	@Success		200		{string}    "status: authorized"	"success"
//	@Failure		403		{string}	string					"forbidden"
//	@Failure		401		{string}	string					"unauthorized"
//	@Failure		500		{string}	string					"server error"
//	@Router			/movies  [get]
func GetMovies(c *gin.Context) {
	res := helpers.NewResponse("v1", "movies")
	s := MongoDBClient{}
	var result []requests.Movie
	var err error
	if result, err = s.GetAll(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, res.Success(result))
}
