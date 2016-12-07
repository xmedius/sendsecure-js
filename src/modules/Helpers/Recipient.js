import BaseHelper from './BaseHelper.js';
import ContactMethod from './ContactMethod.js';

export default class Recipient extends BaseHelper{
  constructor(object){
    super();
    var propertyOrNull = (s) => (object && s in object) ? object[s] : null;
    this.email = propertyOrNull('email');
    this.firstName = propertyOrNull('first_name');
    this.lastName = propertyOrNull('last_name');
    this.companyName = propertyOrNull('company_name');
    this.contactMethods = null;
    if (object && 'contact_methods' in object){
      this.contactMethods = object.contact_methods.map((contactMethod) => {
        new ContactMethod(contactMethod);
      });
    }
    Object.seal(this);
  }
}
