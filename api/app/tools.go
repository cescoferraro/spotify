package app

import "os"

var (
	VERSION string
)

// IsProd TODO: NEEDS COMMENT INFO
func IsProd() bool {
	prod := os.Getenv("KUBERNETES")
	if prod == "true" {
		return true
	}
	return false
}
