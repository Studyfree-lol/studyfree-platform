package controller

import (
	"backend/api"
	"backend/database"
	"backend/utils"
	"context"
	"github.com/gofiber/fiber/v2"
	"github.com/jackc/pgx/v5/pgtype"
	openapi_types "github.com/oapi-codegen/runtime/types"
	"math"
)

const universityPageSize = 20

func (ctr *Controller) GetUniversities(c *fiber.Ctx, params api.GetUniversitiesParams) error {
	page := 0
	if params.Page != nil && *params.Page > 0 {
		page = int(*params.Page) - 1
	}

	result, err := ctr.queries.FindUniversities(context.Background(), database.FindUniversitiesParams{
		Limit:  universityPageSize,
		Offset: int32(universityPageSize * page),
	})
	if err != nil {
		print(err.Error())
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	totalUniversities, err := ctr.queries.GetUniversityCount(context.Background())
	if err != nil {
		print(err.Error())
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	totalPages := math.Ceil(float64(totalUniversities) / float64(universityPageSize))
	items := make([]api.ModelUniversityPreview, 0)
	for _, university := range result {
		items = append(items, api.ModelUniversityPreview{
			Id:        university.ID.Bytes,
			Country:   university.Country,
			City:      university.City,
			Name:      university.Name,
			NameShort: university.NameShort,
			Language:  university.Language,
		})
	}

	return c.JSON(map[string]interface{}{
		"totalPages": totalPages,
		"items":      items,
	})
}

func (ctr *Controller) PostUniversities(c *fiber.Ctx) error {
	var payload api.PostUniversitiesJSONBody
	if err := c.BodyParser(&payload); err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	result, err := ctr.queries.CreateUniversity(context.Background(), database.CreateUniversityParams{
		Name:      payload.Name,
		NameShort: payload.NameShort,
		City:      payload.City,
		Country:   payload.Country,
		Language:  payload.Language,
	})
	if err != nil {
		print(err.Error())
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	return c.JSON(api.ModelUniversityPreview{
		Id:        result.ID.Bytes,
		Country:   result.Country,
		City:      result.City,
		Name:      result.Name,
		NameShort: result.NameShort,
		Language:  result.Language,
	})
}

func (ctr *Controller) GetUniversitiesUniversityId(c *fiber.Ctx, universityId openapi_types.UUID) error {
	result, err := ctr.queries.FindUniversity(context.Background(), pgtype.UUID{
		Bytes: universityId,
		Valid: true,
	})
	if err != nil {
		return c.SendStatus(fiber.StatusNotFound)
	}

	courses := make([]api.ModelCoursePreview, 0)
	for i, idInterface := range result.CourseIds.([]interface{}) {
		cId, err := utils.ParseUUID(idInterface)
		if err != nil {
			continue
		}
		courses = append(courses, api.ModelCoursePreview{
			Id:        cId,
			Name:      result.CourseNames.([]string)[i], // TODO: Find something nicer
			NameShort: result.CourseNamesShort.([]string)[i],
		})
	}

	return c.JSON(api.ModelUniversity{
		Id:        result.ID.Bytes,
		Country:   result.Country,
		City:      result.City,
		Name:      result.Name,
		NameShort: result.NameShort,
		Language:  result.Language,
		Courses:   courses,
	})
}
