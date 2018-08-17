import BaseHelper from './BaseHelper.js';
import DownloadActivityDetail from './DownloadActivityDetail.js';
import _map from 'lodash/map';
import _partial from 'lodash/partial';

let map = new WeakMap();

export default class DownloadActivity extends BaseHelper {
  constructor(object) {
    super();
    map.set(this, {
        guests: this.property(object,'guests').using(_partial(_map, _partial.placeholder, v => new DownloadActivityDetail(v))).orDefault([]),
        owner: this.property(object,'owner').using(v => new DownloadActivityDetail(object.owner)).orNull()
    });
    Object.seal(this);
  }

  get guests() {
    return map.get(this).guests;
  }

  get owner() {
    return map.get(this).owner;
  }

  toObject() {
    return {
      guests: this.guests.map(guest => guest.toObject()),
      owner: this.owner === null ? null : this.owner.toObject()
    };
  }

}