-- name: CreateUniversity :one
INSERT INTO universities (
    name, name_short, country, city, language
) VALUES ($1, $2, $3, $4, $5)
RETURNING *;

-- name: FindUniversity :one
SELECT * FROM universities_populated WHERE id=$1;

-- name: CreateCourses :copyfrom
INSERT INTO courses (
    id, created_at, university_id, name
) VALUES ($1, $2, $3, $4);

-- name: CreateDocuments :copyfrom
INSERT INTO documents (
    id, created_at, title, thumbnail_url, file_url, tag, course_id
) VALUES ($1, $2, $3, $4, $5, $6, $7);