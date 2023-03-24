package api

import (
	"net/http"

	public "github.com/Basillica/backend/handlers/public"
	"github.com/gin-gonic/gin"
)

func AddPublicRoutes(r *gin.Engine) {
	// public Endpoints
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusAccepted, gin.H{
			"message": "pong",
		})
	})
	r.POST("/login", public.Login)
}
