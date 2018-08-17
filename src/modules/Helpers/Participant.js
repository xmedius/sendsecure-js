import _map from 'lodash/map';
import _extend from 'lodash/extend';
import _flatten from 'lodash/flatten';
import BaseHelper, { PARAMS } from './BaseHelper.js';
import GuestOptions from './GuestOptions.js';
import { camelCasify } from '../Utils/helperFunctions.js';

let map =  new WeakMap();
export default class Participant extends BaseHelper{
  constructor(object){
    super();
    object = camelCasify(object);
    this.email = this.property(object, 'email').orNull();
    this.firstName = this.property(object, 'firstName').orNull();
    this.lastName = this.property(object, 'lastName').orNull();
    map.set(this, {
      id: this.property(object, 'id').orNull(),
      type: this.property(object, 'type').orNull(),
      role: this.property(object, 'role').orNull(),
      messageReadCount: this.property(object, 'messageReadCount').orNull(),
      messageTotalCount: this.property(object, 'messageTotalCount').orNull(),
      guestOptions: this.property(object,'guestOptions').using(v => new GuestOptions(object.guestOptions)).orDefault(new GuestOptions())
    });
    Object.seal(this);
  }

  set guestOptions(options){
    map.set(this).guestOptions = new GuestOptions(options);
  }

  get guestOptions(){
    return map.get(this).guestOptions;
  }

  get id() {
    return map.get(this).id;
  }

  get type() {
    return map.get(this).type;
  }

  get role() {
    return map.get(this).role;
  }

  get messageReadCount() {
    return map.get(this).messageReadCount;
  }

  get messageTotalCount() {
    return map.get(this).messageTotalCount;
  }

  _underscorifyKeysFor(param){
    let guestOptions = this.guestOptions;
    delete this.guestOptions;
    let value = super.underscorifyKeys();
    if(guestOptions === null) {
      return value;
    }
    else {
        value.company_name = guestOptions.companyName;
        if (param != PARAMS.CREATION) {
          value.locked = guestOptions.locked;
        }
        value.contact_methods = _map(guestOptions.contactMethods, (item) => item._underscorifyKeysFor(param));
      return value;
    }
  }

  updateFor(param){
    let self = this;
    if (param == PARAMS.CONTACT_DESTRUCTION){
      return {
        ofFollowingContacts(...contactMethodIds){
          contactMethodIds = _flatten(contactMethodIds);
          self.guestOptions.contactMethods.forEach(contact => {
            if(contactMethodIds.includes(contact.id)) {
              contact._destroy = "1";
            }
          });
          return self.updateFor(PARAMS.EDITION);
        }
      }
    }
    return {
      toJson(){
        let participant = self._underscorifyKeysFor(param);
        return JSON.stringify({ participant: participant });
      }
    }
  }

  toObject() {
    return {
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      id: this.id,
      type: this.type,
      role: this.role,
      messageReadCount: this.messageReadCount,
      messageTotalCount: this.messageTotalCount,
      guestOptions: this.guestOptions.toObject()
    };
  }

}
