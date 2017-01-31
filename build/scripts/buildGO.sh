#!/usr/bin/env bash
go build -o dist/spotify -ldflags "-X common.main.VERSION=$VERSION" src/api/main.go
