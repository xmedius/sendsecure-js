import _isObject from 'lodash/isObject'
import _isArray from 'lodash/isArray'
import _map from 'lodash/map'
import _reduce from 'lodash/reduce'
import ContactMethod from './ContactMethod.js'

export default class Recipient {
  constructor(object){
    if (object){
      this.email = object.email;
      this.firstName = object.first_name;
      this.lastName = object.last_name;
      this.companyName = object.company_name;

      if ('contact_methods' in object){
        this.contactMethods = object.contact_methods.map((contactMethod) => {
          new ContactMethod(contactMethod)
        })
      }

    }
  }

  underscorify(){
    const underscorify = (s) => s.replace(/([A-Z])/g, function(m){return `_${m.toLowerCase()}`;});
    let result = _reduce(this, (res, value, key) => {
      let r = null;
      if (_isObject(value)){
        if (_isArray(value)){
          r = _map(value, (e) => { return e.underscorify() } )
        }
        else {
          r = value;
        }
      }
      else {
        r = value;
      }

      res[underscorify(key)] = r;
      return res;
    }, {})
    return result;
  }
}
