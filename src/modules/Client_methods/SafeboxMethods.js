import Helpers from '../Helpers/Helpers.js';
import _map from 'lodash/map';
import * as Exception from '../sendSecureException.js';
import { camelCasify } from '../Utils/helperFunctions.js';
import { TIME_UNIT } from '../Helpers/Safebox.js';
import * as Utils from '../Utils/platform.js';

/**
* Reply to a specific safebox associated to the current user's account.
*
* @param safebox: A Safebox object
* @param reply: A reply object
* @return An object containing the request result
*/
export function reply(safebox, reply) {
  if (safebox.guid === null) {
    throw new Exception.SendSecureException(1, "SafeBox GUID cannot be null");
  }
  let requests = _map(reply.attachments, (attachment) => {
    let params = Utils.isNode ?
    {
      fileStream: attachment.stream,
      contentType: attachment.contentType,
      filename: attachment.filename
    } : {
      file: attachment.file
    };
    let fileParams = safebox.temporaryDocument(attachment.stream.length);

    return this.jsonClient.newFile(safebox.guid, JSON.stringify(fileParams))
    .then(result => {
      return this.jsonClient.uploadFile(result.upload_url, params)
      .then(response => attachment.guid = response.temporary_document.document_guid);
    });
  });

  return Promise.all(requests).then(response => {
    return this.jsonClient.reply(safebox.guid, reply.toJson());
  })
  .catch (error => { throw error; });
}

/**
* Add time to the expiration date of a specific safebox associated to the current user's account.
*
* @param safebox: A Safebox object
*        value and unit: amount of time to be added to the expiration date
* @return The request result
*/
export function addTime(safebox, value, timeUnit) {
  if (safebox.guid === null) {
    throw new Exception.SendSecureException(1, "SafeBox GUID cannot be null");
  }
  if (!Object.values(TIME_UNIT).includes(timeUnit)) {
    throw new Exception.SendSecureException(1, "Invalid time unit");
  }
  var timeParams = JSON.stringify({ safebox: { add_time_value: value, add_time_unit: timeUnit }});

  return this.jsonClient.addTime(safebox.guid, timeParams)
  .then(res => {
    safebox.expiration = res.new_expiration;
    return res;
  })
  .catch(error => { throw error; });
}

/**
* Close a specific safebox associated to the current user's account.
*
* @param safebox: A Safebox object
*
* @return The request result
*/
export function closeSafebox(safebox) {
  if (safebox.guid === null) {
    throw new Exception.SendSecureException(1, "SafeBox GUID cannot be null");
  }
  return this.jsonClient.closeSafebox(safebox.guid);
}

/**
* Delete content of a specific safebox associated to the current user's account.
*
* @param safebox: A Safebox object
*
* @return The request result
*/
export function deleteSafeboxContent(safebox) {
  if (safebox.guid === null) {
    throw new Exception.SendSecureException(1, "SafeBox GUID cannot be null");
  }
  return this.jsonClient.deleteSafeboxContent(safebox.guid);
}

/**
* Mark all messages as read of a specific safebox associated to the current user's account.
*
* @param safebox: A Safebox object
*
* @return The request result
*/
export function markAsRead(safebox) {
  if (safebox.guid === null) {
    throw new Exception.SendSecureException(1, "SafeBox GUID cannot be null");
  }
  return this.jsonClient.markAsRead(safebox.guid);
}

/*
* Mark all messages as unread of a specific safebox associated to the current user's account.
*
* @param safebox: A Safebox object
*
* @return The request result
*/
export function markAsUnread(safebox) {
  if (safebox.guid === null) {
    throw new Exception.SendSecureException(1, "SafeBox GUID cannot be null");
  }
  return this.jsonClient.markAsUnread(safebox.guid);
}

/**
* Mark a message as read of a specific safebox associated to the current user's account.
*
* @param safebox: A Safebox object
*
* @param message: A Message object
*
* @return The request result
*/
export function markAsReadMessage(safebox, message) {
  if (safebox.guid === null) {
    throw new Exception.SendSecureException(1, "SafeBox GUID cannot be null");
  }
  if (message === null) {
    throw new Exception.SendSecureException(1, "Message cannot be null");
  }
  return this.jsonClient.markAsReadMessage(safebox.guid, message.id);
}

/**
* Mark a message as unread of a specific safebox associated to the current user's account.
*
* @param safebox: A Safebox object
*
* @param message: A Message object
*
* @return The request result
*/
export function markAsUnreadMessage(safebox, message) {
  if (safebox.guid === null) {
    throw new Exception.SendSecureException(1, "SafeBox GUID cannot be null");
  }
  if (message === null) {
    throw new Exception.SendSecureException(1, "Message cannot be null");
  }
  return this.jsonClient.markAsUnreadMessage(safebox.guid, message.id);
}

/**
* Retrieve the audit record url of a specific safebox associated to the current user's account.
*
* @param safebox: A Safebox object
*
* @return The audit record pdf stream
*/
export function getAuditRecordPdf(safebox) {
  if (safebox.guid === null) {
    throw new Exception.SendSecureException(1, "SafeBox GUID cannot be null");
  }
  return this.getAuditRecordPdfUrl(safebox);
}

/**
* Retrieve the audit record url of a specific safebox associated to the current user's account.
*
* @param safebox: A Safebox object
*
* @return The audit record url
*/
export function getAuditRecordPdfUrl(safebox) {
  if (safebox.guid === null) {
    throw new Exception.SendSecureException(1, "SafeBox GUID cannot be null");
  }
  return this.jsonClient.getAuditRecordPdfUrl(safebox.guid)
  .then(res => res.url)
  .catch(error => { throw error; });
}

/**
* Retrieve all info of an existing safebox for the current user account.
*
* @param safebox:
*            A Safebox object
* @param sections:
*           Array of string containing the sections to be retrieved
*
* @return The updated Safebox
*/
export function getSafeboxInfo(safebox, sections = []) {
  if (safebox.guid === null) {
    throw new Exception.SendSecureException(1, "SafeBox GUID cannot be null");
  }
  return this.jsonClient.getSafeboxInfo(safebox.guid, sections.join())
  .then(
    result => new Helpers.Safebox(Object.assign(safebox.toObject(), camelCasify(result.safebox)))
  );
}

/**
* Retrieve all participants info of an existing safebox for the current user account.
*
* @param safebox: A Safebox object
*
* @return The list of all participants of the safebox, with all their properties.
*/
export function getSafeboxParticipants(safebox) {
  if (safebox.guid === null) {
    throw new Exception.SendSecureException(1, "SafeBox GUID cannot be null");
  }
  return this.jsonClient.getSafeboxParticipants(safebox.guid)
  .then(result => {
    return result.participants.map((p) => new Helpers.Participant(p));
  });
}

/**
* Retrieve all messages info of an existing safebox for the current user account.
*
* @param safebox: A Safebox object
*
* @return The list of all messages of the safebox, with all their properties.
*/
export function getSafeboxMessages(safebox) {
  if (safebox.guid === null) {
    throw new Exception.SendSecureException(1, "SafeBox GUID cannot be null");
  }
  return this.jsonClient.getSafeboxMessages(safebox.guid)
  .then(result => {
    return result.messages.map((m) => new Helpers.Message(m));
  });
}

/**
* Retrieve all security options info of an existing safebox for the current user account.
*
* @param safebox: A Safebox object
*
* @return All values/properties of the security options.
*/
export function getSafeboxSecurityOptions(safebox) {
  if (safebox.guid === null) {
    throw new Exception.SendSecureException(1, "SafeBox GUID cannot be null");
  }
  return this.jsonClient.getSafeboxSecurityOptions(safebox.guid)
  .then(result => {
    return new Helpers.SecurityOptions(result.security_options);
  });
}

/**
* Retrieve all download activity info of an existing safebox for the current user account.
*
* @param safebox: A Safebox object
*
* @return All values/properties of the download activity.
*/
export function getSafeboxDownloadActivity(safebox) {
  if (safebox.guid === null) {
    throw new Exception.SendSecureException(1, "SafeBox GUID cannot be null");
  }
  return this.jsonClient.getSafeboxDownloadActivity(safebox.guid)
  .then(result => {
    return new Helpers.DownloadActivity(result.download_activity);
  });
}

/**
* Retrieve all event history info of an existing safebox for the current user account.
*
* @param safebox: A Safebox object
*
* @return The list of all event history of the safebox, with all their properties.
*/
export function getSafeboxEventHistory(safebox) {
  if (safebox.guid === null) {
    throw new Exception.SendSecureException(1, "SafeBox GUID cannot be null");
  }
  return this.jsonClient.getSafeboxEventHistory(safebox.guid)
  .then(result => {
    return result.event_history.map((e) => new Helpers.EventHistory(e));
  });
}
