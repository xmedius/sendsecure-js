import _map from 'lodash/map';
import _pick from 'lodash/pick';
import Helpers from '../Helpers/Helpers.js';
import { SECURITY_OPTIONS_KEYS } from '../Helpers/Safebox.js';
import { camelCasify } from '../Utils/helperFunctions.js';
import * as Utils from '../Utils/platform.js';

/**
* This method is a high-level combo that initializes the SafeBox,
* uploads all attachments and commits the SafeBox.
*
* @param safebox
*            A non-initialized Safebox object with security profile, recipient(s), subject, message and attachments
*            (not yet uploaded) already defined.
* @return The updated Safebox
*/
export function submitSafebox(safebox) {
  return this.initializeSafebox(safebox)
    .then(sbx => {
      let requests = _map(sbx.attachments, (item) => {
        return this.uploadAttachment(sbx, item);
      });
      return Promise.all(requests).then(attachments => {
        sbx.attachments = attachments;
        return sbx;
      });
    })
    .then(sbx => {
      if (sbx.securityProfileId === null) {
          return this.enterpriseSettings()
          .then( enterpriseSettings => {
            sbx.securityProfileId = enterpriseSettings.defaultSecurityProfileId;
            return this.commitSafebox(sbx);
          });
      }
      else {
        return this.commitSafebox(sbx);
      }
    })
    .catch (error => { throw error; });
}

/**
* Pre-creates a SafeBox on the SendSecure system and initializes the Safebox object accordingly.
*
* @param safebox
*            A SafeBox object to be finalized by the SendSecure system
* @return The updated SafeBox object with the necessary system parameters (GUID, public encryption key, upload URL)
* filled out.
*/
export function initializeSafebox(safebox) {
  return this.jsonClient.newSafebox(safebox.userEmail)
    .then(result => {
      safebox.guid = result.guid;
      safebox.publicEncryptionKey = result.public_encryption_key;
      safebox.uploadUrl = result.upload_url;
      return safebox;
    })
    .catch( error => { throw error; });
}

/**
* This actually "Sends" the SafeBox with
* all content and contact info previously specified.
*
* @param safebox
*            A Safebox object already finalized, with security profile, recipient(s), subject and message already
*            defined, and attachments already uploaded.
* @return Updated Safebox
*/
export function commitSafebox(safebox) {
  let sb = safebox.toObject();
  return this.jsonClient.commitSafebox(safebox.toJson())
    .then(result => {
      result = camelCasify(result);
      result.securityOptions = _pick(result, SECURITY_OPTIONS_KEYS);
      return new Helpers.Safebox(Object.assign(sb, result));
    })
    .catch (error => { throw error; });
}

/**
* Uploads the specified file as an Attachment of the specified SafeBox.
*
* @param safebox
*            An initialized Safebox object
* @param attachment
*            An Attachment object - the file to upload to the SendSecure system
* @return The updated Attachment object with the GUID parameter filled out.
*/
export function uploadAttachment(safebox, attachment) {
  var param = Utils.isNode ?
    {
      fileStream: attachment.stream,
      contentType: attachment.contentType,
      filename: attachment.filename
    } : {
      file: attachment.file
    }
  return this.jsonClient.uploadFile(safebox.uploadUrl, param)
    .then(result => {
      attachment.guid = result.temporary_document.document_guid;
      return attachment;
    });
}
