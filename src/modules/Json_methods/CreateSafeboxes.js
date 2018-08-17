import * as Utils from '../Utils/platform.js';
import _any from 'lodash/some.js';
import _all from 'lodash/every.js';
import * as Exception from '../sendSecureException.js';

/**
 * Pre-creates a SafeBox on the SendSecure system and initializes the Safebox object accordingly.
 *
 * @param userEmail
 *            The email address of a SendSecure user of the current enterprise account
 * @return The json containing the guid,
 *         public encryption key and upload url of the initialized SafeBox
 */
export function newSafebox(userEmail) {
  const suffix = `api/v2/safeboxes/new?user_email=${userEmail}&locale=${this.locale}`;
  return this._makeRequest(suffix);
}

/**
 * Finalizes the creation (commit) of the SafeBox on the SendSecure system. This actually "Sends" the SafeBox
 * with all content and contact info previously specified.
 *
 * @param safeboxJson
 *            The full json expected by the server
 * @return The json containing the informations of the SafeBox
 */
export function commitSafebox(safeboxJson) {
  const suffix = `api/v2/safeboxes?locale=${this.locale}`;
  return this._makeRequest(
    suffix,
    {
      headers: {'Authorization-Token': this.apiToken, 'Content-Type': 'application/json'},
      method: 'post',
      body: safeboxJson,
    }
  );
}

/**
* Pre-creates a document on the SendSecure system.
*
* @param safeboxGuid
*            The guid of the existing safebox
* @param fileJson
*            The full json expected by the server
* @return The json containing the temporary document GUID and the upload URL
*/
export function newFile(safeboxGuid, fileJson) {
  const suffix = `api/v2/safeboxes/${safeboxGuid}/uploads?locale=${this.locale}`;
  return this._makeRequest(
    suffix,
    {
      headers: {'Authorization-Token': this.apiToken, 'Content-Type': 'application/json'},
      method: 'post',
      body: fileJson,
    });
}

/**
* Uploads the specified file as an Attachment of the specified SafeBox.
*
* @param uploadUrl
*            The url returned by the newSafeBox. Can be used multiple times
* @param object
*            The MIME content type of the uploaded file
* @return The json containing the guid of the uploaded file
*/
export function uploadFile(uploadUrl, object) {
  if (!_any(['file', 'filePath', 'fileStream'], (elt) => elt in object)){
    throw new Exception.SendSecureException('0', 'upload File arguments error');
  }
  else {
    if (Utils.isNode) {
      if ('filePath' in object) {
        if (Utils.fs.existsSync(object.filePath)){
          var data = Utils.fs.readFileSync(object.filePath);
          var contentType = object.contentType || Utils.lookup(object.filePath);
          var filename = object.filename || Utils.path.basename(object.filePath);
          return this._uploadFileNode(uploadUrl, data, contentType, filename);
        }
        else {
          throw new Exception.SendSecureException('0', `${object.filePath} does not exist`);
        }
      }
      else {
        if (_all(['fileStream', 'contentType', 'filename'], (elt) => elt in object)){
          return this._uploadFileNode(uploadUrl, object.fileStream, object.contentType, object.filename);
        }
      }
    }
    else {
      if ('file' in object && object.file instanceof File){
        return this._uploadFileBrowser(uploadUrl, object.file);
      }
      else {
        throw new Exception.SendSecureException('0', '"file" argument should be an instance of File');
      }
    }
  }
}