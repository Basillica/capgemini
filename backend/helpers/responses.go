package helpers

import (
	"github.com/gin-gonic/gin"
)

type response struct {
	Version string `json:"version"`
	Domain  string `json:"domain"`
	Output  string `json:"output"`
}

// NewResponse Returns a new response instance
func NewResponse(version, domain string) *response {
	return &response{
		Version: version,
		Domain:  domain,
	}
}

// Returns a header containing the status of the operation and the error message
//
// It takes an error string as an input
func (r *response) Error(reason string) gin.H {
	x := gin.H{"status": "Failed", "error": reason}
	return x
}

// Returns a header containing the status of the operation (success) and an the result payload
//
// It takes an interface as an input
func (r *response) Success(result interface{}) gin.H {
	x := gin.H{"status": "success"}
	if result != nil {
		x["result"] = result
	}
	return x
}

// Returns a header containing the status of the operation (success) and a paginated result payload
//
// It takes an interface as an input
func (r *response) SuccessWithPagination(result interface{}, paginationData string) gin.H {
	x := gin.H{"status": "Success"}
	if result != nil {
		x["Result"] = result
	}
	hasMore := false
	if len(paginationData) > 0 {
		hasMore = true
	}
	x["metadata"] = struct {
		PaginationKey string `json:"Paginationkey"`
		HasMore       bool   `json:"has_more"`
	}{
		PaginationKey: paginationData,
		HasMore:       hasMore,
	}
	return x
}
