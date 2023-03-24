package middleware

import (
	"net/http"
	"strings"

	"github.com/Basillica/backend/helpers"
	"github.com/gin-gonic/gin"
)

func JwtAuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		reqToken := c.Request.Header.Get("Authorization")
		splitToken := strings.Split(reqToken, "Bearer ")
		if len(splitToken) != 2 {
			c.String(http.StatusUnauthorized, "you do not have valid access rights to this endpoint")
			c.Abort()
			return
		}

		accessToken := splitToken[1]
		// Validate the token of the user
		if _, err := helpers.ValidateToken(accessToken, c); err != nil {
			c.String(http.StatusForbidden, "you not have valid access rights to this endpoint")
			c.Abort()
			return
		}

		c.Next()
	}
}
