package controller

import (
	"backend/api"
	"backend/database"
	"context"
	"errors"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
	openapi_types "github.com/oapi-codegen/runtime/types"
)

func (ctr *Controller) GetUniversities(c *fiber.Ctx, params api.GetUniversitiesParams) error {
	return errors.New("not implemented")
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
		cId, err := uuid.FromBytes(idInterface.([]byte)[:])
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
