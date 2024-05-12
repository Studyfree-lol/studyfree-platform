package utils

import (
	"errors"
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

func ParseStringSlice(slice interface{}) ([]string, error) {
	switch slice.(type) {
	case []interface{}:
		strings := make([]string, 0)
		for _, item := range slice.([]interface{}) {
			switch item.(type) {
			case string:
				strings = append(strings, item.(string))
				break
			default:
				return []string{}, errors.New("slice includes non string values")
			}
		}
		return strings, nil
	}
	return []string{}, errors.New("cannot parse interface that is not a slice([]interface{})")
}
