package controller

import (
	"backend/api"
	"github.com/gofiber/fiber/v2"
	"github.com/meilisearch/meilisearch-go"
	"net/http"
)

func (ctr *Controller) PostSearch(c *fiber.Ctx, params api.PostSearchParams) error {
	searchRes, err := ctr.coursesSearchIndex.Search(params.Q, &meilisearch.SearchRequest{
		AttributesToHighlight: []string{""},
	})
	if err != nil {
		return c.SendStatus(http.StatusInternalServerError)
	}

	return c.JSON(searchRes)
}
