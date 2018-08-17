/**
* Search the recipients for a safebox
*
* @param term
*          A Search term
*
* @return The json containing request result
*/
export function searchRecipient(term) {
  const suffix = `api/v2/participants/autocomplete?term=${term}`;
  return this._makeRequest(suffix);
}