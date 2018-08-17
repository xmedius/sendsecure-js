import BaseHelper from './BaseHelper.js';
import ConsentMessage from './ConsentMessage.js';
import _map from 'lodash/map';
import _partial from 'lodash/partial';
import { camelCasify } from '../Utils/helperFunctions.js';

let map = new WeakMap();

export default class ConsentMessageGroup extends BaseHelper {
  constructor(object) {
    super();
    object = camelCasify(object);
    map.set(this, {
        id: this.property(object, 'id').orNull(),
        name: this.property(object, 'name').orNull(),
        createdAt: this.property(object, 'createdAt').orNull(),
        updatedAt: this.property(object, 'updatedAt').orNull(),
        consentMessages: this.property(object,'consentMessages').using(_partial(_map, _partial.placeholder, v => new ConsentMessage(v))).orDefault([])
    });
    Object.seal(this);
  }

  get id() {
    return map.get(this).id;
  }

  get name() {
    return map.get(this).name;
  }

  get createdAt() {
    return map.get(this).createdAt;
  }

  get updatedAt() {
    return map.get(this).updatedAt;
  }

  get consentMessages() {
    return map.get(this).consentMessages;
  }

}