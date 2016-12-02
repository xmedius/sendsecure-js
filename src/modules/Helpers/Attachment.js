import _isObject from 'lodash/isObject'
import _isArray from 'lodash/isArray'
import _map from 'lodash/map'
import _reduce from 'lodash/reduce'
export default class Attachment {
  constructor(file) {
    this.file = file
    this.guid = null
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
