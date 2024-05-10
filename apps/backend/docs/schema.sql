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
    courses
) AS (
    SELECT
        universities.*,
        array_agg(courses.id) AS course_ids,
        array_agg(courses.name) AS course_names
    FROM universities
    LEFT JOIN courses ON courses.id = universities.id
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