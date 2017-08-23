#!/usr/bin/env bash
go build -o api/dist/spotify -ldflags "-X main.version=$VERSION" api/main.go
cp api/Dockerfile api/dist/Dockerfile
