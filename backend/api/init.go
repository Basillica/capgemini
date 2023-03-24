package api

import (
	"fmt"

	_ "github.com/Basillica/backend/docs"
	"github.com/Basillica/backend/handlers/auth"
	"github.com/Basillica/backend/helpers"
	"github.com/Basillica/backend/middleware"
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"     // swagger embed files
	ginSwagger "github.com/swaggo/gin-swagger" // gin-swagger middleware
)

// New registers the routes and returns the router.
func New() *gin.Engine {
	r := gin.New()
	r.Use(gin.Recovery())
	r.Use(gin.Logger())
	r.Use(middleware.ConfigMiddleware(), middleware.CORSMiddleware())
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	AddPublicRoutes(r)
	AddAuthRoutes(r)
	UpdateDB()
	return r
}

func UpdateDB() {
	movieService := helpers.NewMovie()
	movies, err := movieService.GetAll()
	if err != nil {
		return
	}

	fmt.Println("prepopulating the database ...")
	s := auth.MongoDBClient{}
	for _, movie := range movies.Results {
		if err := s.Create(movie); err != nil {
			fmt.Println("error creating item in database ..", err.Error())
		}
	}
	fmt.Println("completed prepopulating the database ...")
}
