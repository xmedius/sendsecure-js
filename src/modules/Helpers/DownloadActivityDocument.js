import BaseHelper from './BaseHelper.js';
import { camelCasify } from '../Utils/helperFunctions.js';

let map = new WeakMap();

export default class DownloadActivityDocument extends BaseHelper {
  constructor(object) {
    super();
    object = camelCasify(object);
    map.set(this, {
        id: this.property(object, 'id').orNull(),
        downloadedBytes: this.property(object, 'downloadedBytes').orNull(),
        downloadDate: this.property(object, 'downloadDate').orNull()
    });
    Object.seal(this);
  }

  get id() {
    return map.get(this).id;
  }

  get downloadedBytes() {
    return map.get(this).downloadedBytes;
  }

  get downloadDate() {
    return map.get(this).downloadDate;
  }

  toObject() {
    return {
      id: this.id,
      downloadedBytes: this.downloadedBytes,
      downloadDate: this.downloadDate
    };
  }

}
