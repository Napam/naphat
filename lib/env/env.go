package env

import (
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
		Host:           GetEnv("HOST", "localhost"),
		Port:           GetEnv("PORT", "8080"),
		LiveReloadHost: os.Getenv("LIVE_RELOAD_PROXY_HOST"),
		LiveReloadPort: os.Getenv("LIVE_RELOAD_PROXY_PORT"),
	}
}

func GetEnv(name string, fallback string) string {
	if val := os.Getenv(name); val != "" {
		return val
	}
	return fallback
}