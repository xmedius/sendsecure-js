import _map from 'lodash/map';
import BaseHelper from './BaseHelper.js';
import PersonalSecureLink from './PersonalSecureLink.js';
import { camelCasify } from '../Utils/helperFunctions.js';

let map =  new WeakMap();

export default class UserSettings extends BaseHelper {

  constructor(object){
    super();
    object = camelCasify(object);
    map.set(this, {
      createdAt: this.property(object, 'createdAt').orNull(),
      updatedAt: this.property(object, 'updatedAt').orNull(),
      maskNote: this.property(object, 'maskNote').orNull(),
      openFirstTransaction: this.property(object, 'openFirstTransaction').orNull(),
      markAsRead: this.property(object, 'markAsRead').orNull(),
      markAsReadDelay: this.property(object, 'markAsReadDelay').orNull(),
      rememberKey: this.property(object, 'rememberKey').orNull(),
      defaultFilter: this.property(object, 'defaultFilter').orNull(), //[everything, in_progress, closed, content_deleted, unread]
      recipientLanguage: this.property(object, 'recipientLanguage').orNull(),
      secureLink: this.property(object,'secureLink').using(v => new PersonalSecureLink(object.secureLink)).orNull()
    });
    Object.seal(this);
  }

  get createdAt(){
    return map.get(this).createdAt;
  }

  get updatedAt(){
    return map.get(this).updatedAt;
  }

  get maskNote(){
    return map.get(this).maskNote;
  }

  get openFirstTransaction(){
    return map.get(this).openFirstTransaction;
  }

  get markAsRead(){
    return map.get(this).markAsRead;
  }

  get markAsReadDelay(){
    return map.get(this).markAsReadDelay;
  }

  get rememberKey(){
    return map.get(this).rememberKey;
  }

  get defaultFilter(){
    return map.get(this).defaultFilter;
  }

  get recipientLanguage(){
    return map.get(this).recipientLanguage;
  }

  get secureLink(){
    return map.get(this).secureLink;
  }

}
