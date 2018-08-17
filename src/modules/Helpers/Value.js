import BaseHelper from './BaseHelper.js';

let map = new WeakMap();

export default class Value extends BaseHelper {
  constructor(object) {
    super();
    map.set(this, {
        value: this.property(object, 'value').orNull(),
        modifiable: this.property(object, 'modifiable').orNull()
    });
    Object.seal(this);
  }

  get value() {
    return map.get(this).value;
  }

  get modifiable() {
    return map.get(this).modifiable;
  }

}