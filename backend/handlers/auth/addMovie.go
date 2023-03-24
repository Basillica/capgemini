package auth

import (
	"net/http"

	"github.com/Basillica/backend/helpers"
	"github.com/Basillica/backend/types/requests"
	"github.com/gin-gonic/gin"
)

// AddMovie godoc
//
//	@Summary		add a movie
//	@Description	endpoint to add a movie
//	@Tags           movie
//	@Accept		    json
//	@Produce		json
//	@Success		200			{string}    "status: authorized"	"success"
//	@Param			addMovie	body		requests.Movie			true	"profile swipe request"
//	@Failure		403		{string}	string					"forbidden"
//	@Failure		401		{string}	string					"unauthorized"
//	@Failure		500		{string}	string					"server error"
//	@Router			/movie  [post]
func AddMovie(c *gin.Context) {
	var req requests.Movie
	// validate payload
	if bErr := c.ShouldBindJSON(&req); bErr != nil {
		helpers.FormatError(c, bErr)
		return
	}

	s := MongoDBClient{}
	if err := s.Create(req); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "created successfully"})
}
