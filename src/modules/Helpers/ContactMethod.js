import BaseHelper, { PARAMS }  from './BaseHelper.js';
import { camelCasify } from '../Utils/helperFunctions.js';

let map = new WeakMap();

export default class ContactMethod extends BaseHelper {
  constructor(object) {
    super();
    object = camelCasify(object);
    this.destinationType = this.property(object, 'destinationType').orNull();
    this.destination = this.property(object, 'destination').orNull();
    map.set(this, {
        _destroy: null,
        id: this.property(object, 'id').orNull(),
        verified: this.property(object, 'verified').orNull(),
        createdAt: this.property(object, 'createdAt').orNull(),
        updatedAt: this.property(object, 'updatedAt').orNull()
    });
    Object.seal(this);
  }

  set _destroy(value) {
    return map.get(this)._destroy = value;
  }

  get _destroy() {
    return map.get(this)._destroy;
  }

  get id() {
    return map.get(this).id;
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

  _underscorifyKeysFor(param) {
    let contactMethod = super.underscorifyKeys();
    switch(param) {
      case PARAMS.CREATION: return contactMethod; break;
      case PARAMS.EDITION:
      case PARAMS.CONTACT_DESTRUCTION:
      if (this.id) {
        contactMethod.id = this.id;
      }
      if (this._destroy) {
        contactMethod._destroy = this._destroy;
      }
      return contactMethod; break;
      default: return contactMethod;
    }
  }

  toObject() {
    return {
      destinationType: this.destinationType,
      destination: this.destination,
      id: this.id,
      verified: this.verified,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

}
