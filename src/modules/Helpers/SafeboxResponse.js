import BaseHelper from './BaseHelper.js';

export default class SafeboxResponse extends BaseHelper {
  constructor(object) {

    super();
    var propertyOrNull = (s) => (object && s in object) ? object[s] : null;
    this.previewUrl = propertyOrNull('preview_url');
    this.encryptionKey = propertyOrNull('encryptionKey');
    this.guid = propertyOrNull('guid');
    Object.seal(this);
  }
}
