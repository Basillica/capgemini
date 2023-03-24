Capgemini Challenge
===
## Introduction
The backend and frontend are developed as seperate applications, running on docker containers and orchestrated using `docker-compose`.
The backend was developed in `Go`, using the [gin](https://github.com/gin-gonic/gin) framework. The frontend is written in Typescript with the React framework.
The backend is served beyond an nginx proxy, data is read from the provided api and stored to a mongodb database.

## Running the application
To run the application, `docker` and `docker-compose` are required. To run the application, use the command
```shell
$ docker compose up
```
This will serve the application with every required component and afterwards, the application will be accessible from `localhost:3000`.
There was a dummy authentication set up, so a login would be required to use the application.
The credentials are as follows
```bash
$ username == user@gmail.com
$ password == password
```
There are some restrictions put in place to regulate the type of data coming in from the client which can be found here `https://github.com/Basillica/capgemini/blob/main/backend/types/requests/auth.go`. A very simple one would be that the lenght of the title be longer than `6` charaters.
There is also an integrated swagger documentation which can be reached at `http://localhost/swagger/index.html#/`.

## Suggestions for improvement
* Filtering was moved to the frontend, as `movies` are read from state.
* A websocket connection can be also created in an event-driven fashion to have the client supplied with the latest changes and data.