import BaseHelper from './BaseHelper.js';
export default class ExtensionFilter extends BaseHelper {
  constructor(object) {
    super();
    this.mode = this.propertyOrNull(object, 'mode');
    this.list = this.propertyOrNull(object, 'list');
    Object.seal(this);
  }
}
