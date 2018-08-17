import BaseHelper from './BaseHelper.js';
import { camelCasify } from '../Utils/helperFunctions.js';

let map = new WeakMap();

export default class ConsentMessage extends BaseHelper {
  constructor(object) {
    super();
    object = camelCasify(object);
    map.set(this, {
        locale: this.property(object, 'locale').orNull(),
        value: this.property(object, 'value').orNull(),
        createdAt: this.property(object, 'createdAt').orNull(),
        updatedAt: this.property(object, 'updatedAt').orNull()
    });
    Object.seal(this);
  }

  get locale() {
    return map.get(this).locale;
  }

  get value() {
    return map.get(this).value;
  }

  get createdAt() {
    return map.get(this).createdAt;
  }

  get updatedAt() {
    return map.get(this).updatedAt;
  }

}