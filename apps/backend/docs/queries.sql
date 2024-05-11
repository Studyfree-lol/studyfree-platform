-- name: CreateUniversities :copyfrom
INSERT INTO universities (
    id, created_at, name
) VALUES ($1, $2, $3);

-- name: CreateCourses :copyfrom
INSERT INTO courses (
    id, created_at, university_id, name
) VALUES ($1, $2, $3, $4);

-- name: CreateDocument :one
INSERT INTO documents (
    id, created_at, title, thumbnail_url, file_url, tag, course_id
) VALUES ($1, $2, $3, $4, $5, $6, $7)
RETURNING id;

-- name: UpdateDocumentFile :exec
UPDATE documents SET file_url=$1 WHERE id=$2;

-- name: FindDocument :one
SELECT * FROM documents WHERE id=$1;