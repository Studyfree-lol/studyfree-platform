package controller

import (
	"backend/database"
	"github.com/jackc/pgx/v5/pgxpool"
)

type Controller struct {
	db      *pgxpool.Pool
	queries *database.Queries
}

func New(db *pgxpool.Pool, queries *database.Queries) *Controller {
	return &Controller{
		db:      db,
		queries: queries,
	}
}
