#!/usr/bin/env bash
go build -o dist_api/spotify -ldflags "-X main.version=$VERSION" api/main.go
