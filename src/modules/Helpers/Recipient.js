import _isArray from 'lodash/isArray';
import _map from 'lodash/map';
import _extend from 'lodash/extend';
import BaseHelper from './BaseHelper.js';
import ContactMethod from './ContactMethod.js';
import * as Exception from '../sendSecureException.js';

let map =  new WeakMap();
export default class Recipient extends BaseHelper{
  constructor(object){
    super();
    this.email = this.propertyOrNull(object, 'email');
    this.firstName = this.propertyOrNull(object, 'first_name');
    this.lastName = this.propertyOrNull(object, 'last_name');
    this.companyName = this.propertyOrNull(object, 'company_name');
    map.set(this, {
      contactMethods: (object && 'contact_methods' in object) ? _map(object.contact_methods, (item) => new ContactMethod(item)) : []
    });
    Object.seal(this);
  }

  set contactMethods(value) {
    if (!_isArray(value)){
      throw new Exception.SendSecureException('0', 'contactMethods must be an Array');
    }
    map.get(this).contactMethods = value;
  }

  get contactMethods() {
    return map.get(this).contactMethods;
  }

  underscorifyKeys(){
    let value = super.underscorifyKeys();
    return _extend(value, {contact_methods: _map(this.contactMethods, (item) => item.underscorifyKeys())});
  }
}
