package api

import (
	"github.com/Basillica/backend/handlers/auth"
	"github.com/Basillica/backend/middleware"
	"github.com/gin-gonic/gin"
)

func AddAuthRoutes(r *gin.Engine) {
	// auth Endpoints
	r.GET("/movie/:id", middleware.JwtAuthMiddleware(), auth.GetMovie)
	r.GET("/movies", middleware.JwtAuthMiddleware(), auth.GetMovies)
	r.POST("/movie", middleware.JwtAuthMiddleware(), auth.AddMovie)
	r.GET("/filter/:str", middleware.JwtAuthMiddleware(), auth.FilterMovie)
}
