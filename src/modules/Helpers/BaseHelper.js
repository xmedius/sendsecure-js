import _isObject from 'lodash/isObject'
import _isArray from 'lodash/isArray'
import _reduce from 'lodash/reduce'
import _map from 'lodash/map'

export default class BaseHelper {
  underscorifyKeys(){
    const underscorify = (s) => s.replace(/([A-Z])/g, function(m){return `_${m.toLowerCase()}`;});
    let result = _reduce(this, (res, value, key) => {
      res[underscorify(key)] = _isArray(value) ? _map(value, (e) => { return e.underscorifyKeys() } ) : value;
      return res;
    }, {})
    return result;
  }
}
