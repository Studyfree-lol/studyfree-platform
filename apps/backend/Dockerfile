FROM golang:1.22-alpine3.18 as builder

WORKDIR /app

LABEL maintainer="Khadim Fall <info@khadimfall.com>"

COPY go.mod go.sum ./

RUN go mod download

COPY . .

RUN go build -o main ./cmd


# Runtime Stage
FROM alpine:3.18

WORKDIR /root/

COPY --from=builder /app/main .

EXPOSE 5000

CMD ["./main"]
