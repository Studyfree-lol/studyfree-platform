package controller

import (
	"backend/database"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/minio/minio-go/v7"
)

type Controller struct {
	db      *pgxpool.Pool
	queries *database.Queries
	minio   *minio.Client
}

func New(db *pgxpool.Pool, queries *database.Queries, minio *minio.Client) *Controller {
	return &Controller{
		db:      db,
		queries: queries,
		minio:   minio,
	}
}
