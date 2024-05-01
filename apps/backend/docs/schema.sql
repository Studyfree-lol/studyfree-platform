CREATE TABLE universities (
   id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
   name TEXT NOT NULL,
   updated_at timestamptz NOT NULL,
   created_at timestamptz NOT NULL
);

CREATE TABLE documents (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    thumbnail_url TEXT NOT NULL,
    pdf_url TEXT NOT NULL,
    university_id uuid REFERENCES universities(id),
    updated_at timestamptz NOT NULL,
    created_at timestamptz NOT NULL
);