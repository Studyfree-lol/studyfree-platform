package controller

import (
	"backend/api"
	"errors"
	"github.com/gofiber/fiber/v2"
	openapi_types "github.com/oapi-codegen/runtime/types"
)

func (ctr *Controller) GetCoursesCourseIdDocuments(c *fiber.Ctx, courseId openapi_types.UUID) error {
	return errors.New("not implemented")
}

func (ctr *Controller) PostCoursesCourseIdDocuments(c *fiber.Ctx, courseId openapi_types.UUID, params api.PostCoursesCourseIdDocumentsParams) error {
	return errors.New("not implemented")
}
