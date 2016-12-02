import ContactMethod from './ContactMethod.js'

export default class Recipient {
  constructor(object){
    if (object){
      this.email = object.email;
      this.firstName = object.first_name;
      this.lastName = object.lastName;
      this.companyName = object.companyName;

      this.contactMethods = object.contact_methods.map((contactMethod) => {
        new ContactMethod(contactMethod)
      })
    }
  }
}
