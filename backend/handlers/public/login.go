package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/Basillica/backend/helpers"
	"github.com/Basillica/backend/types/appenv"
	"github.com/Basillica/backend/types/auth"
	"github.com/Basillica/backend/types/requests"
)

const (
	USERNAME = "user@gmail.com"
	PASSWORD = "password"
)

// Login godoc
//
//	@Summary		login as a user
//	@Description	login endpoint for the registered user
//	@Tags           auth
//	@Accept		    json
//	@Produce		json
//	@Success		200		{string}    "token: some really long token"	"success"
//	@Param			loginRequest	body	requests.LoginRequest			true	"login request"
//	@Failure		403		{string}	string					"forbidden"
//	@Failure		401		{string}	string					"unauthorized"
//	@Failure		500		{string}	string					"server error"
//	@Router			/login  [post]
func Login(c *gin.Context) {
	var req requests.LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		helpers.FormatError(c, err)
		return
	}

	if req.Email != USERNAME || req.Password != PASSWORD {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "you are not authorized to access this service"})
		return
	}

	ae := c.MustGet("appenv").(*appenv.AppConfig)
	t := auth.Token{}
	token, err := t.GenerateToken(req.Email)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "could not generate token for user"})
		return
	}

	c.SetCookie("access_token", token, 86400, "/", ae.CookieDomain, ae.CookieSecureEnabled, ae.CookieHTTPOnly)
	c.SetSameSite(http.SameSiteStrictMode)
	c.JSON(http.StatusOK, gin.H{"token": token})
}
