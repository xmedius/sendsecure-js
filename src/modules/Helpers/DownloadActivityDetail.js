import BaseHelper from './BaseHelper.js';
import DownloadActivityDocument from './DownloadActivityDocument.js';
import _map from 'lodash/map';
import _partial from 'lodash/partial';

let map = new WeakMap();

export default class DownloadActivityDetail extends BaseHelper {
  constructor(object) {
    super();
    map.set(this, {
        id: this.property(object, 'id').orNull(),
        documents: this.property(object,'documents').using(_partial(_map, _partial.placeholder, v => new DownloadActivityDocument(v))).orDefault([])
    });
    Object.seal(this);
  }

  get id() {
    return map.get(this).id;
  }

  get documents() {
    return map.get(this).documents;
  }

  toObject() {
    return {
      id: this.id,
      documents: this.documents.map( document => document.toObject())
    };
  }

}