import BaseHelper from './BaseHelper.js';

export default class ContactMethod extends BaseHelper {
  constructor(object) {
    super();
    this.destinationType = this.propertyOrNull(object, 'destinationType');
    this.destination = this.propertyOrNull(object, 'destination');
    Object.seal(this);
  }
}
