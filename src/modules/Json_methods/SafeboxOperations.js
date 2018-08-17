/**
* Reply to a specific safebox associated to the current user's account.
*
* @param safeboxGuid
*            The guid of the safebox to be updated
* @param replyJson
*            The full json expected by the server
*
* @return The json containing request result
*/
export function reply(safeboxGuid, replyJson) {
  const suffix = `api/v2/safeboxes/${safeboxGuid}/messages?locale=${this.locale}`;
  return this._makeRequest(
    suffix,
    {
      headers: {'Authorization-Token': this.apiToken, 'Content-Type': 'application/json'},
      method: 'post',
      body: replyJson
    }
  );
}

/**
* Create a new participant for a specific open safebox of the current user account.
*
* @param safeboxGuid
*            The guid of the safebox to be updated
* @param participantParams
*            The full json expected by the server

* @return The json containing all information on new Participant
*/
export function createParticipant(safeboxGuid, participantJson) {
  const suffix = `api/v2/safeboxes/${safeboxGuid}/participants`;
  return this._makeRequest(
    suffix,
    {
      headers: {'Authorization-Token': this.apiToken, 'Content-Type': 'application/json'},
      method: 'post',
      body: participantJson,
    }
  );
}

/**
* Edit an existing participant for a specific open safebox of the current user account.
*
* @param safeboxGuid
*            The guid of the safebox to be updated
* @param participantId
*            The guid of the participant to be updated
* @param participantJson
*            The full json expected by the server
*
* @return The json containing all information on Participant
*/
export function updateParticipant(safeboxGuid, participantId, participantJson) {
  const suffix = `api/v2/safeboxes/${safeboxGuid}/participants/${participantId}`;
  return this._makeRequest(
    suffix,
    {
      headers: {'Authorization-Token': this.apiToken, 'Content-Type': 'application/json'},
      method: 'patch',
      body: participantJson,
    }
  );
}

/**
* Manually add time to expiration date for a specific open safebox of the current user account.
*
* @param safeboxGuid
*            The guid of the participant to be updated
* @param timeJson
*            The full json expected by the server
*
* @return The json containing request result and new expiration date
*/
export function addTime(safeboxGuid, timeJson) {
  const suffix = `api/v2/safeboxes/${safeboxGuid}/add_time?locale=${this.locale}`;
  return this._makeRequest(
    suffix,
    {
      headers: {'Authorization-Token': this.apiToken, 'Content-Type': 'application/json'},
      method: 'patch',
      body: timeJson,
    }
  );
}

/**
* Manually close an existing safebox for the current user account.
*
* @param safeboxGuid
*
* @return The json containing request result
*/
export function closeSafebox(safeboxGuid) {
  const suffix = `api/v2/safeboxes/${safeboxGuid}/close?locale=${this.locale}`;
  return this._makeRequest(
    suffix,
    {
      headers: {'Authorization-Token': this.apiToken, 'Content-Type': 'application/json'},
      method: 'patch',
    }
  );
}

/**
* Manually delete the content of a closed safebox for the current user account.
*
* @param safeboxGuid
*
* @return The json containing request result
*/
export function deleteSafeboxContent(safeboxGuid) {
  const suffix = `api/v2/safeboxes/${safeboxGuid}/delete_content?locale=${this.locale}`;
  return this._makeRequest(
    suffix,
    {
      headers: {'Authorization-Token': this.apiToken, 'Content-Type': 'application/json'},
      method: 'patch',
    }
  );
}

/*
* Manually mark as read an existing safebox for the current user account.
*
* @param safeboxGuid
*
* @return The json containing request result
*/
export function markAsRead(safeboxGuid) {
  const suffix = `api/v2/safeboxes/${safeboxGuid}/mark_as_read?locale=${this.locale}`;
  return this._makeRequest(
    suffix,
    {
      headers: {'Authorization-Token': this.apiToken, 'Content-Type': 'application/json'},
      method: 'patch',
    }
  );
}

/**
* Manually mark as unread an existing safebox for the current user account.
*
* @param safeboxGuid
*
* @return The json containing request result
*/
export function markAsUnread(safeboxGuid) {
  const suffix = `api/v2/safeboxes/${safeboxGuid}/mark_as_unread?locale=${this.locale}`;
  return this._makeRequest(
    suffix,
    {
      headers: {'Authorization-Token': this.apiToken, 'Content-Type': 'application/json'},
      method: 'patch',
    }
  );
}

/**
* Manually mark as read an existing message.
*
* @param safeboxGuid
*
* @param messageId
*
* @return The json containing request result
*/
export function markAsReadMessage(safeboxGuid, messageId) {
  const suffix = `api/v2/safeboxes/${safeboxGuid}/messages/${messageId}/read?locale=${this.locale}`;
  return this._makeRequest(
    suffix,
    {
      headers: {'Authorization-Token': this.apiToken, 'Content-Type': 'application/json'},
      method: 'patch',
    }
  );
}

/**
* Manually mark as unread an existing message.
*
* @param safeboxGuid
*
* @param messageId
*
* @return The json containing request result
*/
export function markAsUnreadMessage(safeboxGuid, messageId) {
  const suffix = `api/v2/safeboxes/${safeboxGuid}/messages/${messageId}/unread?locale=${this.locale}`;
  return this._makeRequest(
    suffix,
    {
      headers: {'Authorization-Token': this.apiToken, 'Content-Type': 'application/json'},
      method: 'patch',
    }
  );
}

/**
* Retrieve a specific file url of an existing safebox for the current user account.
*
* @param safeboxGuid
*            The guid of the safebox to be updated
* @param documentGuid
*            The guid of the file
* @param userEmail
*            The current user email
*
* @return The json containing the file url on the fileserver
*/
export function getFileUrl(safeboxGuid, documentGuid, userEmail) {
  const suffix = `api/v2/safeboxes/${safeboxGuid}/documents/${documentGuid}/url?user_email=${userEmail}&locale=${this.locale}`;
  return this._makeRequest(suffix);
}

/**
* Retrieve the url of an existing safebox for the current user account.
*
* @param safeboxGuid
*
* @return The json containing the pdf url
*/
export function getAuditRecordPdfUrl(safeboxGuid) {
  const suffix = `api/v2/safeboxes/${safeboxGuid}/audit_record_pdf?locale=${this.locale}`;
  return this._makeRequest(suffix);
}

/**
* Retrieve the pdf of an existing safebox for the current user account.
*
* @param safeboxGuid
*
* @return The audit record pdf
*/
export function getAuditRecordPdf(url) {
  return this._makeRequest(url);
}