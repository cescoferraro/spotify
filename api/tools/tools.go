package tools

import (
	"log"
	"os"
)

// IsProd TODO: NEEDS COMMENT INFO
func IsProd() bool {
	prod := os.Getenv("KUBERNETES")
	if prod == "true" {
		log.Println("truuue!")
		return true
	}
	log.Println("false!!!!!!!!!")
	return false
}
