package controller

import (
	"backend/api"
	"backend/database"
	"context"
	"errors"
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/minio/minio-go/v7"
	openapi_types "github.com/oapi-codegen/runtime/types"
)

func (ctr *Controller) GetCoursesCourseIdDocuments(c *fiber.Ctx, courseId openapi_types.UUID) error {
	return errors.New("not implemented")
}

func (ctr *Controller) PostCoursesCourseIdDocuments(c *fiber.Ctx, courseId openapi_types.UUID, params api.PostCoursesCourseIdDocumentsParams) error {
	file, err := c.FormFile("fileUpload")
	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}
	buffer, err := file.Open()
	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}
	defer buffer.Close()

	tx, err := ctr.db.Begin(context.Background())
	if err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}
	defer tx.Rollback(context.Background())

	qtx := ctr.queries.WithTx(tx)
	recordId, err := qtx.CreateDocument(context.Background(), database.CreateDocumentParams{
		CourseID: pgtype.UUID{
			Bytes: courseId,
			Valid: true,
		},
		Title:        params.Name,
		Tag:          string(params.Tag),
		ThumbnailUrl: "",
		FileUrl:      "",
	})
	if err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	contentType := file.Header["Content-Type"][0]
	objectName := fmt.Sprintf("document_%x.pdf", recordId)
	obj, err := ctr.minio.PutObject(
		context.Background(),
		ctr.documentsBucketName,
		objectName,
		buffer,
		file.Size,
		minio.PutObjectOptions{ContentType: contentType},
	)
	if err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	if err := qtx.UpdateDocumentFile(context.Background(), database.UpdateDocumentFileParams{
		ID:      recordId,
		FileUrl: obj.Key,
	}); err != nil {
		defer ctr.minio.RemoveObject(context.Background(), ctr.documentsBucketName, objectName, minio.RemoveObjectOptions{})
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	if err := tx.Commit(context.Background()); err != nil {
		defer ctr.minio.RemoveObject(context.Background(), ctr.documentsBucketName, objectName, minio.RemoveObjectOptions{})
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	finalRecord, err := ctr.queries.FindDocument(context.Background(), recordId)

	result := &api.ModelDocument{
		Id:       finalRecord.ID.Bytes,
		Title:    finalRecord.Title,
		FileUrl:  finalRecord.FileUrl,
		Tag:      finalRecord.Tag,
		ThumbUrl: finalRecord.ThumbnailUrl,
	}

	return c.Status(fiber.StatusOK).JSON(result)
}
