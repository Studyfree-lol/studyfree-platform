package controller

import (
	"backend/api"
	"backend/database"
	"context"
	"github.com/gofiber/fiber/v2"
	"github.com/jackc/pgx/v5/pgtype"
	openapi_types "github.com/oapi-codegen/runtime/types"
)

func (ctr *Controller) PostUniversitiesUniversityIdCourses(c *fiber.Ctx, universityId openapi_types.UUID) error {
	var payload api.PostUniversitiesUniversityIdCoursesJSONBody
	if err := c.BodyParser(&payload); err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	uniResult, err := ctr.queries.FindUniversity(context.Background(), pgtype.UUID{
		Bytes: universityId,
		Valid: true,
	})
	if err != nil {
		return c.SendStatus(fiber.StatusNotFound)
	}

	result, err := ctr.queries.CreateCourse(context.Background(), database.CreateCourseParams{
		Name:         payload.Name,
		NameShort:    payload.NameShort,
		UniversityID: uniResult.ID,
	})
	if err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	return c.JSON(api.ModelCoursePreview{
		Id:        result.ID.Bytes,
		Name:      result.Name,
		NameShort: result.NameShort,
	})
}

func (ctr *Controller) GetCoursesCourseId(c *fiber.Ctx, courseId openapi_types.UUID) error {
	result, err := ctr.queries.FindCourse(context.Background(), pgtype.UUID{
		Bytes: courseId,
		Valid: true,
	})
	if err != nil {
		return c.SendStatus(fiber.StatusNotFound)
	}

	return c.JSON(api.ModelCourse{
		Id:        result.ID.Bytes,
		Name:      result.Name,
		NameShort: result.NameShort,
		University: api.ModelCourseUniversityPreview{
			Id:        result.UniversityID.Bytes,
			Name:      result.UniversityName,
			NameShort: result.UniversityNameShort,
		},
	})
}
