package controller

import (
	"backend/api"
	"backend/database"
	"backend/utils"
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

	tx, err := ctr.db.Begin(context.Background())
	if err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}
	defer tx.Rollback(context.Background())
	qtx := ctr.queries.WithTx(tx)

	uniResult, err := qtx.FindUniversity(context.Background(), pgtype.UUID{
		Bytes: universityId,
		Valid: true,
	})
	if err != nil {
		return c.SendStatus(fiber.StatusNotFound)
	}

	result, err := qtx.CreateCourse(context.Background(), database.CreateCourseParams{
		Name:         payload.Name,
		NameShort:    payload.NameShort,
		UniversityID: uniResult.ID,
	})
	if err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	uniId := utils.UUIDToString(uniResult.ID)
	courseId := utils.UUIDToString(result.ID)
	if _, err := ctr.coursesSearchIndex.AddDocuments([]map[string]interface{}{
		{"id": courseId, "title": payload.Name, "nameShort": payload.NameShort, "universityId": uniId, "universityName": uniResult.Name, "universityNameShort": uniResult.NameShort, "universityCountry": uniResult.Country},
	}); err != nil {
		print(err.Error())
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	if err := tx.Commit(context.Background()); err != nil {
		defer ctr.coursesSearchIndex.Delete(courseId)
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
