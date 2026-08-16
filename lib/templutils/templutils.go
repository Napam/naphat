package templutils

import "strings"

func JoinClasses(classes ...string) string {
	return strings.Join(classes, " ")
}
