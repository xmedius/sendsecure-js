import Helpers from '../Helpers/Helpers.js';
import { PARAMS } from '../Helpers/BaseHelper.js';
import { camelCasify } from '../Utils/helperFunctions.js';
import * as Exception from '../sendSecureException.js';

/**
* Create a new participant for a specific safebox associated to the current user's account,
*     and add the new participant to the Safebox object.
*
* @param safebox: A Safebox object
*        participant: A Participant object
* @return The updated Participant
*/
export function createParticipant(safebox, participant) {
  if(!safebox.guid) {
    throw new Exception.SendSecureException(1, "SafeBox GUID cannot be null");
  }
  if(!participant.email) {
    throw new Exception.SendSecureException(1, "Participant email cannot be null");
  }
  return this.jsonClient.createParticipant(safebox.guid, participant.updateFor(PARAMS.CREATION).toJson())
  .then(res => {
    participant = new Helpers.Participant(Object.assign(participant.toObject(), camelCasify(res)));
    safebox.participants.push(participant);
    return participant;
  });
}

/**
* Update an existing participant of a specific safebox associated to the current user's account.
*
* @param safebox: A Safebox object
*        participant: A Participant object
* @return The updated Participant
*/
export function updateParticipant(safebox, participant) {
  if(!safebox.guid) {
    throw new Exception.SendSecureException(1, "SafeBox GUID cannot be null");
  }
  if(!participant.id) {
    throw new Exception.SendSecureException(1, "Participant id cannot be null");
  }
  return this.jsonClient.updateParticipant(safebox.guid, participant.id, participant.updateFor(PARAMS.EDITION).toJson())
  .then(res => new Helpers.Participant(Object.assign(participant.toObject(), camelCasify(res))));
}

/**
* Delete contact methods of an existing participant of a specific safebox associated to the current user's account.
*
* @param safebox: A Safebox object
*        participant: A Participant object
*        contactMethodIds: list of contact methods ids
* @return The updated Participant
*/
export function deleteParticipantContactMethods(safebox, participant, ...contactMethodIds) {
  if(!safebox.guid) {
    throw new Exception.SendSecureException(1, "SafeBox GUID cannot be null");
  }
  if(!participant.id) {
    throw new Exception.SendSecureException(1, "Participant id cannot be null");
  }
  return this.jsonClient.updateParticipant(safebox.guid, participant.id, participant.updateFor(PARAMS.CONTACT_DESTRUCTION).ofFollowingContacts(contactMethodIds).toJson())
  .then(res => new Helpers.Participant(Object.assign(participant.toObject(), camelCasify(res))));
}