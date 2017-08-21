#!/usr/bin/env bash
go build -o api/spotifyapi -ldflags "-X main.version=$VERSION" api/main.go
