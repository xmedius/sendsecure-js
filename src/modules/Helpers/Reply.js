import BaseHelper from './BaseHelper.js';
import _map from 'lodash/map';
import _partial from 'lodash/partial';
import Attachment from './Attachment.js';
import { camelCasify } from '../Utils/helperFunctions.js';
import * as Exception from '../sendSecureException.js';

let map = new WeakMap();

export default class Reply extends BaseHelper {
  constructor(object) {
    object = camelCasify(object);
    super();
    this.message = this.property(object, 'message').orNull();
    this.consent = this.property(object, 'consent').orNull();
    this.documentIds = this.property(object,'documentIds').orDefault([]);
    map.set(this, {
        attachments: this.property(object,'attachments').using(_partial(_map, _partial.placeholder, v => new Attachment(v))).orDefault([])
    });
    Object.seal(this);
  }

  get attachments() {
    return map.get(this).attachments;
  }

  set attachments(...value) {
    map.get(this).attachments = value;
  }

  addAttachment(attachment) {
    map.get(this).attachments.push(attachment instanceof Attachment ? attachment : new Attachment(attachment));
    return this;
  }

  toJson() {
    let result = {
      message: this.message,
      consent: this.consent,
      document_ids: this.attachments.map(attachment => attachment.guid)
    }
    return JSON.stringify({ safebox: result });
  }

}