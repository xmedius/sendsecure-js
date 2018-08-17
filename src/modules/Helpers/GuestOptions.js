import _map from 'lodash/map';
import _extend from 'lodash/extend';
import _flatten from 'lodash/flatten';
import _partial from 'lodash/partial';
import BaseHelper from './BaseHelper.js';
import ContactMethod from './ContactMethod.js';
import * as Exception from '../sendSecureException.js';
import { camelCasify } from '../Utils/helperFunctions.js';

let map = new WeakMap();

export default class GuestOptions extends BaseHelper {
  constructor(object) {
    super();
    object = camelCasify(object);
    this.companyName = this.property(object, 'companyName').orNull();
    this.locked = this.property(object, 'locked').orNull();
    map.set(this, {
        bouncedEmail: this.property(object, 'bouncedEmail').orNull(),
        failedLoginAttempts: this.property(object, 'failedLoginAttempts').orNull(),
        verified: this.property(object, 'verified').orNull(),
        createdAt: this.property(object, 'createdAt').orNull(),
        updatedAt: this.property(object, 'updatedAt').orNull(),
        contactMethods: this.property(object,'contactMethods').using(_partial(_map, _partial.placeholder, v => new ContactMethod(v))).orDefault([])
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
    map.get(this).contactMethods.push(contactMethod instanceof ContactMethod ? contactMethod : new ContactMethod(contactMethod));
    return this;
  }

  get bouncedEmail() {
    return map.get(this).bouncedEmail;
  }

  get failedLoginAttempts() {
    return map.get(this).failedLoginAttempts;
  }

  get verified() {
    return map.get(this).verified;
  }

  get createdAt() {
    return map.get(this).createdAt;
  }

  get updatedAt() {
    return map.get(this).updatedAt;
  }

  underscorifyKeys(){
    let value = super.underscorifyKeys();
    return _extend(value, {contact_methods: _map(this.contactMethods, (item) => item.underscorifyKeys())});
  }

  toObject() {
    return {
      companyName: this.companyName,
      locked: this.locked,
      bouncedEmail: this.bouncedEmail,
      failedLoginAttempts: this.failedLoginAttempts,
      verified: this.verified,
      contactMethods: this.contactMethods.map(contactMethod => contactMethod.toObject()),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

}
