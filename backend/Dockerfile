# backend/Dockerfile
FROM golang:1.22.3

WORKDIR /app

COPY go.mod ./
COPY go.sum ./
RUN go mod download

COPY .env /.env

COPY . .

WORKDIR /app/cmd/backend

RUN go build -o /backend-app

EXPOSE 8080

CMD ["/backend-app"]