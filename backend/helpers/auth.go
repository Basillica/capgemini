package helpers

import (
	"github.com/Basillica/backend/types/auth"
	"github.com/gin-gonic/gin"
)

// ValidateToken is a helper function that takes an access token and validates it for protected endpoints
//
// It takes an access token and a context object as arguments and returns an error if the token is invalid
func ValidateToken(accessToken string, c *gin.Context) (string, error) {
	var token = ""
	var err error
	t := auth.Token{
		Token: accessToken,
	}
	if tErr := t.ValidateToken(); tErr != nil {
		return token, tErr
	}
	if token, err = t.ExtractTokenID(); err != nil {
		return token, err
	}
	return token, nil
}
