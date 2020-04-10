#!/usr/bin/env bash
mkdir -p dist/
go build -o dist/spotify -ldflags "-X main.version=$VERSION" api/main.go
cp api/Dockerfile dist/Dockerfile
