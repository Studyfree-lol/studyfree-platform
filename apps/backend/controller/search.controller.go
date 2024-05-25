package controller

import (
	"backend/api"
	"github.com/gofiber/fiber/v2"
	"github.com/meilisearch/meilisearch-go"
	"net/http"
)

func (ctr *Controller) PostSearchCourses(c *fiber.Ctx, params api.PostSearchCoursesParams) error {
	searchRes, err := ctr.coursesSearchIndex.Search(params.Q, &meilisearch.SearchRequest{
		AttributesToHighlight: []string{""},
	})
	if err != nil {
		return c.SendStatus(http.StatusInternalServerError)
	}

	return c.JSON(searchRes)
}

func (ctr *Controller) PostSearchUniversities(c *fiber.Ctx, params api.PostSearchUniversitiesParams) error {
	searchRes, err := ctr.universitiesSearchIndex.Search(params.Q, &meilisearch.SearchRequest{
		AttributesToHighlight: []string{""},
	})
	if err != nil {
		return c.SendStatus(http.StatusInternalServerError)
	}

	return c.JSON(searchRes)
}
