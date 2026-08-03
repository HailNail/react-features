// Define custom error messages mapping
const HTTP_ERROR_MESSAGES: Record<number, string> = {
  400: 'Bad Request. The server could not understand the request due to invalid syntax.',
  401: 'Unauthorized. Please log in or check your access token.',
  403: 'Forbidden. You do not have permission to access this resource.',
  404: 'Not Found. The requested page or resource could not be found.',
  408: 'Request Timeout. The server timed out waiting for the request.',
  429: 'Too Many Requests. You have exceeded your rate limit. Please try again later.',
  500: 'Internal Server Error. Something went wrong on the server side.',
  502: 'Bad Gateway. The server received an invalid response from the upstream server.',
  503: 'Service Unavailable. The server is temporarily overloaded or down for maintenance.',
};

// Helper function to handle status codes
function getHttpErrorMessage(status: number): string {
  if (status >= 500) {
    return (
      HTTP_ERROR_MESSAGES[status] ||
      `Server Error (${status}). Please try again later.`
    );
  }
  if (status >= 400) {
    return (
      HTTP_ERROR_MESSAGES[status] ||
      `Client Error (${status}). Please check your request.`
    );
  }
  return 'An unexpected error occurred.';
}

export default getHttpErrorMessage;
