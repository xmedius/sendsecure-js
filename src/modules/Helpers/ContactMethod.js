import _isObject from 'lodash/isObject'
import _reduce from 'lodash/reduce'
import BaseHelper from './BaseHelper.js'

export default class ContactMethod extends BaseHelper {
  constructor(object) {
    super();
    var propertyOrNull = (s) => (object && s in object) ? object[s] : null;
    this.destinationType = propertyOrNull('destinationType');
    this.destination = propertyOrNull('destination');
  }
}
