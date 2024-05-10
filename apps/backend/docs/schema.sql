CREATE TABLE universities (
   id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
   name TEXT NOT NULL,
   name_short TEXT NOT NULL,
   country TEXT NOT NULL CHECK (country ~ '^[A-Z]{2}$'),
   city TEXT NOT NULL,
   language TEXT NOT NULL CHECK (language ~ '^[a-z]{2}-[A-Z]{2}$'),
   updated_at timestamptz NOT NULL,
   created_at timestamptz NOT NULL
);

CREATE TABLE courses (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    university_id uuid REFERENCES universities(id),
    name TEXT NOT NULL,
    name_short TEXT NOT NULL,
    updated_at timestamptz NOT NULL,
    created_at timestamptz NOT NULL
);

CREATE VIEW universities_populated (
    id,
    name,
    name_short,
    country,
    city,
    language,
    created_at,
    updated_at,
    course_ids,
    course_names,
    course_names_short
) AS (
    SELECT
        universities.*,
        array_agg(courses.id) AS course_ids,
        array_agg(courses.name) AS course_names,
        array_agg(courses.name_short) AS course_names_short
    FROM universities
    LEFT JOIN courses ON courses.university_id = universities.id
    GROUP BY universities.id
);

CREATE TABLE documents (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    thumbnail_url TEXT NOT NULL,
    file_url TEXT NOT NULL,
    tag TEXT NOT NULL CHECK (tags IN ('exam', 'notes', 'slides', 'exercise')),
    course_id uuid REFERENCES courses(id),
    updated_at timestamptz NOT NULL,
    created_at timestamptz NOT NULL
);

CREATE VIEW courses_populated (
    id,
    university_id,
    name,
    name_short,
    created_at,
    updated_at,
    university_ids,
    university_names,
    university_names_short
) AS (
    SELECT
        courses.*,
        universities.id AS university_id,
        universities.name AS university_name,
        universities.name_short AS university_name_short
    FROM courses
    JOIN universities ON universities.id = courses.university_id
);