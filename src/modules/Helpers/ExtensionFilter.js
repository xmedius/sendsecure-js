import BaseHelper from './BaseHelper.js';
export default class ExtensionFilter extends BaseHelper {
  constructor(object) {
    super();
    this.mode = this.property(object, 'mode').orNull(); // ["allow", "forbid"]
    this.list = this.property(object, 'list').orNull();
    Object.seal(this);
  }
}
