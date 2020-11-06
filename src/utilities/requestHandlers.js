/**
 * Functions that handle incoming/outgoing HTML requests to/from the API
 * @module src/components/utilities/requestHandlers
 * @author Joe Standring
 * @see src/components for where these functions are used in requests
 */

/*
 * Return the API response if the response code is successful
 * @param {object} response The response received by the API
 * @return The response received by the API if successful
 */
export function status(response) {
  // If the reponse message is a success
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    return new Promise((resolve, reject) => {
      return response.json().then(reject);
    });
  }
}

/**
 * Extract the response body for further processing
 * @param {object} response The response objcet to process
 */
export function json(response) {
  return response.json();
}