package controller

import (
	"backend/database"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/meilisearch/meilisearch-go"
)

type Controller struct {
	db                      *pgxpool.Pool
	queries                 *database.Queries
	meilisearchClient       *meilisearch.Client
	coursesSearchIndex      *meilisearch.Index
	universitiesSearchIndex *meilisearch.Index
}

func New(db *pgxpool.Pool, queries *database.Queries, meilisearchClient *meilisearch.Client) *Controller {
	return &Controller{
		db:                      db,
		queries:                 queries,
		meilisearchClient:       meilisearchClient,
		coursesSearchIndex:      meilisearchClient.Index("courses"),
		universitiesSearchIndex: meilisearchClient.Index("universities"),
	}
}
