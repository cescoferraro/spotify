package app

import "os"

var (
	VERSION string
)

func IsProd() bool {
	prod := os.Getenv("KUBERNETES");
	if prod == "true" {
		return true
	}
	return false
}
