import _isObject from 'lodash/isObject'
import _reduce from 'lodash/reduce'
export default class ContactMethod {
  constructor(object) {
    if (object){
      this.destinationType = object.destinationType;
      this.destination = object.destination;
    }
  }

  underscorify(){
    const underscorify = (s) => s.replace(/([A-Z])/g, function(m){return `_${m.toLowerCase()}`;});
    let result = _reduce(this, (res, value, key) => {
      res[underscorify(key)] = value ? (_isObject(value) ? value.toJson() : value) : null;
      return res;
    }, {})
    return result
  }
}
