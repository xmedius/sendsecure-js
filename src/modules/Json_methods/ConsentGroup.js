/**
 * Call to get the list of all the localized messages of a consent group.
 *
 * @param consentGroupId:
 *                  The id of the consent group
 *
 * @return The json containing the list of all the localized messages
 */
export function getConsentGroupMessages(consentGroupId) {
  const suffix = `api/v2/enterprises/${this.enterpriseAccount}/consent_message_groups/${consentGroupId}?locale=${this.locale}`;
  return this._makeRequest(suffix);
}