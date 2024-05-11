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
	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
	"log"
	"os"
)

func main() {
	port := os.Getenv("PORT")
	postgresUrl := os.Getenv("POSTGRES_URL")
	minioUrl := os.Getenv("MINIO_URL")
	minioAccessKeyId := os.Getenv("MINIO_ACCESS_KEY_ID")
	minioAccessKeySecret := os.Getenv("MINIO_ACCESS_KEY_SECRET")
	documentsBucketName := os.Getenv("DOCUMENTS_BUCKET_NAME")

	conn, err := pgxpool.New(context.Background(), postgresUrl)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}
	defer conn.Close()
	queries := database.New(conn)

	minioClient, err := minio.New(minioUrl, &minio.Options{
		Creds:  credentials.NewStaticV4(minioAccessKeyId, minioAccessKeySecret, ""),
		Secure: false,
	})
	if err != nil {
		log.Fatalln(err)
	}

	if exists, err := minioClient.BucketExists(context.Background(), documentsBucketName); err != nil {
		log.Fatalln(err)
	} else if !exists {
		if err := minioClient.MakeBucket(context.Background(), documentsBucketName, minio.MakeBucketOptions{}); err != nil {
			log.Fatalln(err)
		}
	}

	f := fiber.New(fiber.Config{
		CaseSensitive: true,
		StrictRouting: true,
		AppName:       "Studyfree API",
	})

	c := controller.New(conn, queries, minioClient, documentsBucketName)

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
