import BaseHelper from './BaseHelper.js'
export default class ExtensionFilter extends BaseHelper {
  constructor(object) {
    super();
    var propertyOrNull = (s) => (object && s in object) ? object[s] : null;
    this.mode = propertyOrNull('mode');
    this.list = propertyOrNull('list');
    Object.seal(this);
  }
}
