package utils

import (
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

func ParseUuidString(str string) (pgtype.UUID, error) {
	bytes, err := uuid.Parse(str)
	if err != nil {
		return pgtype.UUID{
			Valid: false,
		}, err
	}
	return pgtype.UUID{
		Bytes: bytes,
		Valid: true,
	}, nil
}

func ParseUUID(bytes interface{}) (uuid.UUID, error) {
	switch bytes.(type) {
	case []uint8:
		return uuid.FromBytes(bytes.([]byte))
	case [16]uint8:
		b := bytes.([16]uint8)
		return uuid.FromBytes(b[:])
	case string:
		return uuid.Parse(bytes.(string))
	}
	return uuid.Parse("")
}
