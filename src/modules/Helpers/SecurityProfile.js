import BaseHelper from './BaseHelper.js'
import _map from 'lodash/map'
import _reduce from 'lodash/reduce'

export default class SecurityProfile extends BaseHelper {
  constructor(object) {
    super();
    var camelCasify = (s) => s.replace(/(\_\w)/g, function(m){return m[1].toUpperCase();});
    _map(object, (value, key) => this[camelCasify(key)] = value );
    Object.seal(this);
  }
}
