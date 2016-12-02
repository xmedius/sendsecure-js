import _isObject from 'lodash/isObject'
import _isArray from 'lodash/isArray'
import _map from 'lodash/map'
import _reduce from 'lodash/reduce'

export default class SecurityProfile {
  constructor(object) {
    var camelCasify = (s) => s.replace(/(\_\w)/g, function(m){return m[1].toUpperCase();});
    _map(object, (value, key) => this[camelCasify(key)] = value )
  }
}
