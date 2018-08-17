/**
* Retrieve a filtered list of safeboxes for the current user account.
*
* @param url
*           The complete search url
* @param searchParams
*           The optional filtering parameters
*
* @return The json containing the count, previous page url, the next page url and a list of Safebox
*/
export function getSafeboxList(url = null, searchParams = {}) {
  if (url === null) {
    let searchParamsString = Object.entries(searchParams).map(v=> v.join('=') ).join('&');
    const suffix = `api/v2/safeboxes?${searchParamsString}&locale=${this.locale}`;
    return this._makeRequest(suffix);
  }
  else {
    return this._makeRequest(url);
  }
}

/**
* Retrieve all info of an existing safebox for the current user account.
*
* @param safeboxGuid
*           The guid of the safebox to be updated
* @param sections
*           The string containing the list of sections to be retrieve
*
* @return The json containing complete information on specified sections. If no sections are specified, it will return all safebox info.
*/
export function getSafeboxInfo(safeboxGuid, sections) {
  const suffix = sections ? `api/v2/safeboxes/${safeboxGuid}?sections=${sections}&locale=${this.locale}`
  : `api/v2/safeboxes/${safeboxGuid}?locale=${this.locale}`;
  return this._makeRequest(suffix);
}

/**
* Retrieve all participants info of an existing safebox for the current user account.
*
* @param safeboxGuid
*           The guid of the safebox to be updated
*
* @return The json containing a list of Participant
*/
export function getSafeboxParticipants(safeboxGuid) {
  const suffix = `api/v2/safeboxes/${safeboxGuid}/participants?locale=${this.locale}`;
  return this._makeRequest(suffix);
}

/**
* Retrieve all messages info of an existing safebox for the current user account.
*
* @param safeboxGuid
*           The guid of the safebox to be updated
*
* @return The json containing a list of Message
*/
export function getSafeboxMessages(safeboxGuid) {
  const suffix = `api/v2/safeboxes/${safeboxGuid}/messages?locale=${this.locale}`;
  return this._makeRequest(suffix);
}

/**
* Retrieve all security options info of an existing safebox for the current user account.
*
* @param safeboxGuid
*           The guid of the safebox to be updated
*
* @return The json containing the Security Options
*/
export function getSafeboxSecurityOptions(safeboxGuid) {
  const suffix = `api/v2/safeboxes/${safeboxGuid}/security_options?locale=${this.locale}`;
  return this._makeRequest(suffix);
}

/**
* Retrieve all download activity info of an existing safebox for the current user account.
*
* @param safeboxGuid
*           The guid of the safebox to be updated
*
* @return The json containing the Download Activity
*/
export function getSafeboxDownloadActivity(safeboxGuid) {
  const suffix = `api/v2/safeboxes/${safeboxGuid}/download_activity?locale=${this.locale}`;
  return this._makeRequest(suffix);
}

/**
* Retrieve all event history info of an existing safebox for the current user account.
*
* @param safeboxGuid
*           The guid of the safebox to be updated
*
* @return The json containing a list of EventHistory
*/
export function getSafeboxEventHistory(safeboxGuid) {
  const suffix = `api/v2/safeboxes/${safeboxGuid}/event_history?locale=${this.locale}`;
  return this._makeRequest(suffix);
}
