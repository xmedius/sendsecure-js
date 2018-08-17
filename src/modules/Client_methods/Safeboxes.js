import Helpers from '../Helpers/Helpers.js';
import * as Exception from '../sendSecureException.js';

/**
* Retrieve a filtered list of safeboxes for the current user account.
*
* @param url
*           The complete search url
* @param searchParams = { url: <search url>, status: <in_progress, closed, content_deleted or unread>, search_term: <search_term>, per_page: < ]0, 1000] default = 100>, page: <page to return> }
*           optional filtering parameters
*
* @return An object containing the count of found safeboxes, previous page url, the next page url and a list of Safebox objects
*/
export function getSafeboxList(url = null, searchParams = {}) {
  return this.jsonClient.getSafeboxList(url, searchParams)
  .then(result => {
    result.safeboxes = result.safeboxes.map((s) => new Helpers.Safebox(s.safebox));
    return result;
  });
}

/**
* Retrieve a safebox by its guid.
*
* @param safeboxGuid:
*                The guid of the safebox to be retrieved
*
* @return A SafeBox object
*/
export function getSafebox(safeboxGuid) {
  return this.getSafeboxList()
  .then(result => {
    let sbx = result.safeboxes.find(safebox => safebox.guid == safeboxGuid);
    if (!sbx) throw new Exception.SendSecureException(0, "No matching safebox found");
    return sbx;
  });
}