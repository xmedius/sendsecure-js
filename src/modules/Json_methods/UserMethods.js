/**
 * Get the User Settings of the current user account
 *
 * @return The json containing the user settings
 */
export function userSettings(userId) {
  const suffix = `api/v2/enterprises/${this.enterpriseAccount}/users/${userId}/settings?locale=${this.locale}`;
  return this._makeRequest(suffix);
}

/**
 * Retrieves all favorites for the current user account.
 *
 * @return The json containing a list of Favorite
 */
export function favorites() {
  const suffix = `api/v2/enterprises/${this.enterpriseAccount}/users/${this.userId}/favorites?locale=${this.locale}`;
  return this._makeRequest(suffix);
}

/**
 * Create a new favorite for the current user account.
 *
 * @param favoriteJson
 *            The full json expected by the server
 * @return The json containing all information on Favorite
 */
export function createFavorite(favoriteJson) {
  const suffix = `api/v2/enterprises/${this.enterpriseAccount}/users/${this.userId}/favorites?locale=${this.locale}`;
  return this._makeRequest(
    suffix,
    {
      headers: {'Authorization-Token': this.apiToken, 'Content-Type': 'application/json'},
      method: 'post',
      body: favoriteJson,
    }
  );
}

/**
 * Edit an existing favorite for the current user account.
 *
 * @param favoriteId
 *            The id of the favorite to be updated
 * @param favoriteJson
 *            The full json expected by the server
 *
 * @return The json containing all information of the updated Favorite
  */
export function editFavorite(favoriteId, favoriteJson) {
  const suffix = `api/v2/enterprises/${this.enterpriseAccount}/users/${this.userId}/favorites/${favoriteId}?locale=${this.locale}`;
  return this._makeRequest(
    suffix,
    {
      headers: {'Authorization-Token': this.apiToken, 'Content-Type': 'application/json'},
      method: 'patch',
      body: favoriteJson,
    }
  );
}

/**
 * Delete an existing favorite for the current user account.
 *
 * @param favoriteId
 *            The id of the favorite to be deleted
 *
 * @return Nothing
 */
export function deleteFavorite(favoriteId) {
  const suffix = `api/v2/enterprises/${this.enterpriseAccount}/users/${this.userId}/favorites/${favoriteId}?locale=${this.locale}`;
  return this._makeRequest(
    suffix,
    {
      headers: {'Authorization-Token': this.apiToken},
      method: 'delete',
    }
  );
}