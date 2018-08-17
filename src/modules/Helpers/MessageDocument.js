import BaseHelper from './BaseHelper.js';

let map = new WeakMap();

export default class MessageDocument extends BaseHelper {
  constructor(object) {
    super();
    map.set(this, {
        id: this.property(object, 'id').orNull(),
        name: this.property(object, 'name').orNull(),
        sha: this.property(object, 'sha').orNull(),
        size: this.property(object, 'size').orNull(),
        url: this.property(object, 'url').orNull()
    });
    Object.seal(this);
  }

  get id() {
    return map.get(this).id;
  }

  get name() {
    return map.get(this).name;
  }

  get sha() {
    return map.get(this).sha;
  }

  get size() {
    return map.get(this).size;
  }

  get url() {
    return map.get(this).url;
  }

  toObject() {
    return {
      id: this.id,
      name: this.name,
      sha: this.sha,
      size: this.size,
      url: this.url
    };
  }
}
