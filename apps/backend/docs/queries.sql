-- name: CreateUniversities :copyfrom
INSERT INTO universities (
    id, created_at, name
) VALUES ($1, $2, $3);

-- name: CreateCourses :copyfrom
INSERT INTO courses (
    id, created_at, university_id, name
) VALUES ($1, $2, $3, $4);

-- name: CreateDocuments :copyfrom
INSERT INTO documents (
    id, created_at, title, thumbnail_url, file_url, tag, course_id
) VALUES ($1, $2, $3, $4, $5, $6, $7);