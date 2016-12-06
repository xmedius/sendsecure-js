import _map from 'lodash/map';
import BaseHelper from './BaseHelper.js'
import ExtensionFilter from './ExtensionFilter.js'

export default class EnterpriseSettings extends BaseHelper {

  constructor(object){
    super();
    var camelCasify = (s) => s.replace(/(\_\w)/g, function(m){return m[1].toUpperCase();});
    _map(object, (value, key) => this[camelCasify(key)] = value )
    this.extensionFilter = new ExtensionFilter(this.extensionFilter);
    Object.seal(this);
  }
}
