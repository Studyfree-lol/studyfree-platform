CREATE TABLE universities (
   id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
   name TEXT NOT NULL,
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