package tools

import (
	"log"
	"net"
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

func GetLocalIP() string {
	addrs, err := net.InterfaceAddrs()
	if err != nil {
		return ""
	}
	for _, address := range addrs {
		// check the address type and if it is not a loopback the display it
		if ipnet, ok := address.(*net.IPNet); ok && !ipnet.IP.IsLoopback() {
			if ipnet.IP.To4() != nil {
				return ipnet.IP.String()
			}
		}
	}
	return ""
}
