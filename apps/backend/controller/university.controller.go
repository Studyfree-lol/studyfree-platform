package controller

import (
	"backend/api"
	"errors"
	"github.com/gofiber/fiber/v2"
	openapi_types "github.com/oapi-codegen/runtime/types"
)

func (ctr *Controller) GetUniversities(c *fiber.Ctx, params api.GetUniversitiesParams) error {
	return errors.New("not implemented")
}

func (ctr *Controller) GetUniversitiesUniversityId(c *fiber.Ctx, universityId openapi_types.UUID) error {
	return errors.New("not implemented")
}
