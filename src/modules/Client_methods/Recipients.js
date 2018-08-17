import * as Exception from '../sendSecureException.js';

/**
* Search the recipients for a SafeBox
*
* @param term: A Search term
*
* @return The list of recipients that matches the search term
*/
export function searchRecipient(term) {
  if(!term) {
    throw new Exception.SendSecureException(1, "Search term cannot be null");
  }
  return this.jsonClient.searchRecipient(term).then(result => result.results);
}