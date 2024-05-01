package controller

import (
	"errors"
	"github.com/gofiber/fiber/v2"
	openapi_types "github.com/oapi-codegen/runtime/types"
)

func (ctr *Controller) GetCoursesCourseIdDocuments(c *fiber.Ctx, courseId openapi_types.UUID) error {
	return errors.New("not implemented")
}
