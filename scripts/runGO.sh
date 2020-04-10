#!/usr/bin/env bash
go run -ldflags "-X main.version=$VERSION" api/main.go
