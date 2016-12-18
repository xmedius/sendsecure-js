import BaseHelper from './BaseHelper.js';

export default class SafeboxResponse extends BaseHelper {
  constructor(object) {

    super();
    this.previewUrl = this.propertyOrNull(object, 'preview_url');
    this.encryptionKey = this.propertyOrNull(object, 'encryptionKey');
    this.guid = this.propertyOrNull(object, 'guid');
    Object.seal(this);
  }
}
