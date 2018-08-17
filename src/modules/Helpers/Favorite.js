import _map from 'lodash/map';
import _partial from 'lodash/partial';
import _extend from 'lodash/extend';
import _flatten from 'lodash/flatten';
import BaseHelper, { PARAMS } from './BaseHelper.js';
import ContactMethod from './ContactMethod.js';
import { camelCasify } from '../Utils/helperFunctions.js';

let map =  new WeakMap();
export default class Favorite extends BaseHelper{
  constructor(object){
    super();
    object = camelCasify(object);
    this.email = this.property(object, 'email').orNull();
    this.firstName = this.property(object, 'firstName').orNull();
    this.lastName = this.property(object, 'lastName').orNull();
    this.companyName = this.property(object, 'companyName').orNull();
    this.orderNumber = this.property(object, 'orderNumber').orNull();
    map.set(this, {
      contactMethods: this.property(object,'contactMethods').using(_partial(_map, _partial.placeholder, v => new ContactMethod(v))).orDefault([]),
      id: this.property(object, 'id').orNull(),
      createdAt: this.property(object, 'createdAt').orNull(),
      updatedAt: this.property(object, 'updatedAt').orNull()
    });
    Object.seal(this);
  }

  set contactMethods(...value) {
    map.get(this).contactMethods = _flatten(value);
  }

  get contactMethods() {
    return map.get(this).contactMethods;
  }

  addContactMethod(contactMethod) {
    (contactMethod instanceof ContactMethod) ?
    map.get(this).contactMethods.push(contactMethod)
    :
    map.get(this).contactMethods.push(new ContactMethod(contactMethod));
    return this;
  }

  get id() {
    return map.get(this).id;
  }

  get createdAt() {
    return map.get(this).createdAt;
  }

  get updatedAt() {
    return map.get(this).updatedAt;
  }

  _underscorifyKeysFor(param) {
    let value = super.underscorifyKeys();
    return _extend(value, {contact_methods: _map(this.contactMethods, (item) => item._underscorifyKeysFor(param))});
  }

  updateFor(param){
    let self = this;
    if (param == PARAMS.CONTACT_DESTRUCTION){
      return {
        ofFollowingContacts(...contactMethodIds){
          contactMethodIds = _flatten(contactMethodIds);
          self.contactMethods.forEach(contact => {
            if(contactMethodIds.includes(contact.id)) {
              contact._destroy = true;
            }
          });
          return self.updateFor(PARAMS.EDITION);
        }
      }
    }
    return {
      toJson(){
        let favorite = self._underscorifyKeysFor(param);
        if (param == PARAMS.CREATION) {
          delete favorite.order_number;
        }
        return JSON.stringify({ favorite: favorite });
      }
    }
  }

  toObject() {
    return {
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      companyName: this.companyName,
      contactMethods: this.contactMethods.map(contactMethod => contactMethod.toObject()),
      id: this.id,
      orderNumber: this.orderNumber,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

}