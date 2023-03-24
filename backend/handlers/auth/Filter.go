package auth

import (
	"net/http"

	"github.com/Basillica/backend/helpers"
	"github.com/Basillica/backend/types/requests"
	"github.com/gin-gonic/gin"
)

// FilterMovie godoc
//
//	@Summary		filter movies by title
//	@Description	Endpoint to filter movies by title
//	@Tags           movie
//	@Accept		    json
//	@Produce		json
//	@Success		200		{string}    "status: authorized"	"success"
//	@Failure		403		{string}	string					"forbidden"
//	@Failure		401		{string}	string					"unauthorized"
//	@Failure		500		{string}	string					"server error"
//	@Router			/filter/:title  [post]
func FilterMovie(c *gin.Context) {
	// The login is handled as a middleware within the JWT Middleware
	str := c.Param("str")
	res := helpers.NewResponse("v1", "movies")
	s := MongoDBClient{}
	var result requests.Movie
	var qErr error
	if result, qErr = s.Filter2(str); qErr != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": qErr.Error()})
		return
	}

	c.JSON(http.StatusOK, res.Success(result))
}
