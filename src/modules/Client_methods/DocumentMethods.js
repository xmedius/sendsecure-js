import * as Exception from '../sendSecureException.js';

/**
* Retrieve a specific file url of a specific safebox associated to the current user's account.
*
* @param safebox: A Safebox object
*        document: An Attachment object
* @return The file url
*/
export function getFileUrl(safebox, document){
  if (safebox.guid === null) {
    throw new Exception.SendSecureException(1, "SafeBox GUID cannot be null");
  }
  if (safebox.userEmail === null) {
    throw new Exception.SendSecureException(1, "SafeBox user email cannot be null");
  }
  if (document.guid === null) {
    throw new Exception.SendSecureException(1, "Document GUID cannot be null");
  }
  return this.jsonClient.getFileUrl(safebox.guid, document.guid, safebox.userEmail)
  .then(result => result.url);
}