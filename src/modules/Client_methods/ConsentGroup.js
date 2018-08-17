import Helpers from '../Helpers/Helpers.js';
/**
 * Call to get the list of all the localized messages of a consent group.
 *
 * @param consentGroupId:
 *                  The id of the consent group
 *
 * @return The list of all the localized messages
 */
export function getConsentGroupMessages(consentGroupId) {
  return this.jsonClient.getConsentGroupMessages(consentGroupId)
  .then(result => new Helpers.ConsentMessageGroup(result.consent_message_group));
}