import BaseHelper from './BaseHelper.js';
import { camelCasify } from '../Utils/helperFunctions.js';

let map = new WeakMap();

export default class PersonalSecureLink extends BaseHelper {
  constructor(object) {
    super();
    object = camelCasify(object);
    map.set(this, {
        enabled: this.property(object, 'enabled').orNull(),
        url: this.property(object, 'url').orNull(),
        securityProfileId: this.property(object, 'securityProfileId').orNull()
    });
    Object.seal(this);
  }

  get enabled() {
    return map.get(this).enabled;
  }

  get url() {
    return map.get(this).url;
  }

  get securityProfileId() {
    return map.get(this).securityProfileId;
  }

  toObject() {
    return {
      enabled: this.enabled,
      url: this.url,
      securityProfileId: this.securityProfileId
    };
  }

}
