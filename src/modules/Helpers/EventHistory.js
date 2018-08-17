import BaseHelper from './BaseHelper.js';

let map = new WeakMap();

export default class EventHistory extends BaseHelper {
  constructor(object) {
    super();
    map.set(this, {
        type: this.property(object, 'type').orNull(),
        date: this.property(object, 'date').orNull(),
        metadata: this.property(object, 'metadata').orNull(), // { emails: <List of strings>, attachment_count: <attachment_count> }
        message: this.property(object, 'message').orNull()
    });
    Object.seal(this);
  }

  get type() {
    return map.get(this).type;
  }

  get date() {
    return map.get(this).date;
  }

  get metadata() {
    return map.get(this).metadata;
  }

  get message() {
    return map.get(this).message;
  }

  toObject() {
    return {
      type: this.type,
      date: this.date,
      metadata: this.metadata,
      message: this.message
    };
  }

}
