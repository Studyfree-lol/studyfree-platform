package main

import (
	"backend/api"
	"backend/controller"
	"backend/database"
	"context"
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/healthcheck"
	"github.com/jackc/pgx/v5/pgxpool"
	"os"
)

func main() {
	port := os.Getenv("PORT")
	postgresUrl := os.Getenv("POSTGRES_URL")

	conn, err := pgxpool.New(context.Background(), postgresUrl)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}
	defer conn.Close()

	queries := database.New(conn)

	f := fiber.New(fiber.Config{
		CaseSensitive: true,
		StrictRouting: true,
		AppName:       "Studyfree API",
	})

	c := controller.New(conn, queries)

	f.Use(cors.New())

	f.Use(healthcheck.New(healthcheck.Config{
		LivenessProbe: func(c *fiber.Ctx) bool {
			return true
		},
		LivenessEndpoint:  "/live",
		ReadinessProbe:    func(c *fiber.Ctx) bool { return true },
		ReadinessEndpoint: "/ready",
	}))
	api.RegisterHandlers(f, c)

	if err := f.Listen(":" + port); err != nil {
		panic(err)
	}
}
