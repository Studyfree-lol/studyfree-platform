# syntax=docker/dockerfile:1

# Build the application from source
FROM golang:1.22-alpine3.18 as builder

WORKDIR /app

LABEL maintainer="Khadim Fall <info@khadimfall.com>"

COPY go.mod go.sum ./

RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -o /backend cmd/main.go

# Deploy the application binary into a lean image
FROM gcr.io/distroless/base-debian11 AS build-release-stage

WORKDIR /

COPY --from=build-stage /backend /backend

EXPOSE 8080

USER nonroot:nonroot

ENTRYPOINT ["/backend"]
