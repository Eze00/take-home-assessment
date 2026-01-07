
// function to add delays in API calls. To handle rate limiting
export const delay = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));