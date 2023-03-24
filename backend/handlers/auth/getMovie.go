package auth

import (
	"net/http"

	"github.com/Basillica/backend/helpers"
	"github.com/Basillica/backend/types/requests"
	"github.com/gin-gonic/gin"
)

// GetMovie godoc
//
//	@Summary		fetch a move by id
//	@Description	endpoinnt to fetch a movie by its id
//	@Tags           movie
//	@Accept		    json
//	@Produce		json
//	@Success		200		{string}    "status: authorized"	"success"
//	@Failure		403		{string}	string					"forbidden"
//	@Failure		401		{string}	string					"unauthorized"
//	@Failure		500		{string}	string					"server error"
//	@Router			/movie/:id  [get]
func GetMovie(c *gin.Context) {
	id := c.Param("id")
	res := helpers.NewResponse("v1", "movies")

	s := MongoDBClient{}
	var result requests.Movie
	var qErr error
	if result, qErr = s.FindId(id); qErr != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": qErr.Error()})
		return
	}

	c.JSON(http.StatusOK, res.Success(result))
}
