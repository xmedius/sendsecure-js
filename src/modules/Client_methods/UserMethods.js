import Helpers from '../Helpers/Helpers.js';
import { camelCasify } from '../Utils/helperFunctions.js';
import { PARAMS } from '../Helpers/BaseHelper.js';
import * as Exception from '../sendSecureException.js';

/**
* Retrieves all the current user account's settings specific to SendSecure Account
*
* @return All values/properties of the user account's settings specific to SendSecure.
*/
export function userSettings(userId) {
  return this.jsonClient.userSettings(userId)
  .then(result => new Helpers.UserSettings(result));
}

/**
* Retrieves all favorites associated to a specific user.
*
* @return The list of all favorites of the user account, with all their properties.
*/
export function favorites() {
  return this.jsonClient.favorites().then(result => {
    return result.favorites.map((f) => new Helpers.Favorite(f));
  });
}

/**
* Create a new favorite associated to a specific user.
*
* @param favorite
*             A Favorite object
* @return The updated Favorite
*/
export function createFavorite(favorite) {
  if(!favorite.email) {
    throw new Exception.SendSecureException(1, "Favorite email cannot be null");
  }
  return this.jsonClient.createFavorite(favorite.updateFor(PARAMS.CREATION).toJson())
  .then(result => new Helpers.Favorite(Object.assign(favorite.toObject(), camelCasify(result))));
}

/**
* Edit an existing favorite associated to a specific user.
*
* @param favorite
*             A Favorite object
* @return The updated Favorite
*/
export function editFavorite(favorite) {
  if(!favorite.id) {
    throw new Exception.SendSecureException(1, "Favorite id cannot be null");
  }
  return this.jsonClient.editFavorite(favorite.id, favorite.updateFor(PARAMS.EDITION).toJson())
  .then(result => new Helpers.Favorite(Object.assign(favorite.toObject(), camelCasify(result))));
}

/**
* Delete contact methods of an existing favorite associated to a specific user.
*
* @param favorite: A Favorite object
*        contactMethodIds: list of contact methods ids
* @return The updated Favorite
*/
export function deleteFavoriteContactMethods(favorite, ...contactMethodIds) {
  if(!favorite.id) {
    throw new Exception.SendSecureException(1, "Favorite id cannot be null");
  }
  return this.jsonClient.editFavorite(favorite.id, favorite.updateFor(PARAMS.CONTACT_DESTRUCTION).ofFollowingContacts(contactMethodIds).toJson())
  .then(result => new Helpers.Favorite(Object.assign(favorite.toObject(), camelCasify(result))));
}

/**
* Edit an existing favorite associated to a specific user.
*
* @param The favorite id to be deleted
*
* @return Nothing
*/
export function deleteFavorite(favorite) {
  return this.jsonClient.deleteFavorite(favorite.id);
}