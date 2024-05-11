-- name: CreateUniversity :one
INSERT INTO universities (
    name, name_short, country, city, language
) VALUES ($1, $2, $3, $4, $5)
RETURNING *;

-- name: FindUniversities :many
SELECT * FROM universities LIMIT $1 OFFSET $2;

-- name: GetUniversityCount :one
SELECT count(*) FROM universities;

-- name: FindUniversity :one
SELECT * FROM universities_populated WHERE id=$1;

-- name: CreateCourse :one
INSERT INTO courses (
   university_id, name, name_short
) VALUES ($1, $2, $3)
RETURNING *;

-- name: FindCourse :one
SELECT * FROM courses_populated WHERE id=$1;

-- name: CreateDocuments :copyfrom
INSERT INTO documents (
    id, created_at, title, thumbnail_url, file_url, tag, course_id
) VALUES ($1, $2, $3, $4, $5, $6, $7);