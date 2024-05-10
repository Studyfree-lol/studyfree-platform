// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0

package database

import (
	"github.com/jackc/pgx/v5/pgtype"
)

type Course struct {
	ID           pgtype.UUID
	UniversityID pgtype.UUID
	Name         string
	UpdatedAt    pgtype.Timestamptz
	CreatedAt    pgtype.Timestamptz
}

type Document struct {
	ID           pgtype.UUID
	Title        string
	ThumbnailUrl string
	FileUrl      string
	Tag          string
	CourseID     pgtype.UUID
	UpdatedAt    pgtype.Timestamptz
	CreatedAt    pgtype.Timestamptz
}

type UniversitiesPopulated struct {
	ID          pgtype.UUID
	Name        string
	NameShort   string
	Country     string
	City        string
	Language    string
	UpdatedAt   pgtype.Timestamptz
	CreatedAt   pgtype.Timestamptz
	CourseIds   interface{}
	CourseNames interface{}
}

type University struct {
	ID        pgtype.UUID
	Name      string
	NameShort string
	Country   string
	City      string
	Language  string
	UpdatedAt pgtype.Timestamptz
	CreatedAt pgtype.Timestamptz
}
