## Build
FROM golang:1.17.2-buster AS build

WORKDIR /backend
COPY . .

COPY go.mod ./
COPY app.env ./
COPY go.sum ./
RUN go mod download

COPY *.go ./
COPY helpers/*.go ./helpers/
# App api definitions
COPY api/*.go ./api/
# handlers
COPY handlers/auth/*.go ./handlers/auth/
COPY handlers/public/*.go ./handlers/public/
COPY middleware/*.go ./middleware/
COPY types/appenv/*.go ./types/appenv/
COPY types/auth/*.go ./types/auth/
COPY types/requests/*.go ./types/requests/

# RUN export GIN_MODE=release & go build -o /capgemini-backend
RUN export GIT_COMMIT=$(git rev-list -1 HEAD) && export GIN_MODE=release & go build -ldflags "-X main.GitVersion=$GIT_COMMIT" -o /capgemini-backend

# Deploy

FROM gcr.io/distroless/base-debian10

WORKDIR /
COPY app.env ./
COPY --from=build /capgemini-backend /capgemini-backend
EXPOSE 8080

USER nonroot:nonroot

ENTRYPOINT ["/capgemini-backend"]