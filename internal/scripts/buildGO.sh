#!/usr/bin/env bash
mkdir -p api/dist/
go build -o api/dist/spotify -ldflags "-X main.version=$VERSION" api/main.go
cp api/Dockerfile api/dist/Dockerfile
