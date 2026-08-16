package env

import (
	"fmt"
	"os"
)

type Env = struct {
	Host string
	Port string
	// For logging purposes only. Not needed in production, so they're optional.
	LiveReloadHost string
	// For logging purposes only. Not needed in production, so they're optional.
	LiveReloadPort string
}

var Vars *Env

func init() {
	Vars = &Env{
		Host:           GetRequiredEnv("HOST"),
		Port:           GetRequiredEnv("PORT"),
		LiveReloadHost: os.Getenv("LIVE_RELOAD_PROXY_HOST"),
		LiveReloadPort: os.Getenv("LIVE_RELOAD_PROXY_PORT"),
	}
}

func GetRequiredEnv(name string) string {
	val := os.Getenv(name)
	if val == "" {
		fmt.Printf("Missing required environment variable: '%s'\n", name)
		os.Exit(1)
	}
	return val
}
