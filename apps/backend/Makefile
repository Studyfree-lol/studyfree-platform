.EXPORT_ALL_VARIABLES:
PORT=8000
POSTGRES_URL=postgres://postgres:mysecretpassword@localhost:5432/studyfree?sslmode=disable

run:
	go run ./cmd/main.go

install:
	go mod tidy

format:
	go fmt ./...

gen-openapi-code:
	go install github.com/deepmap/oapi-codegen/v2/cmd/oapi-codegen@latest && \
	oapi-codegen -package=api -generate types,spec,fiber docs/openapi.yaml > api/api.gen.go

sql-compile:
	go install github.com/sqlc-dev/sqlc/cmd/sqlc@latest && \
	sqlc generate

migrate:
	atlas schema apply \
      --url $$POSTGRES_URL \
      --to file://docs/schema.sql \
      --dev-url "docker://postgres/15/dev"

up:
	docker-compose up --build --force-recreate --no-deps