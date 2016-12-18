import _reduce from 'lodash/reduce';
import _isArray from 'lodash/isArray';
import _extend from 'lodash/extend';
import _map from 'lodash/map';
import BaseHelper from './BaseHelper.js';
import * as Exception from '../sendSecureException.js';

let map =  new WeakMap();
export default class Safebox extends BaseHelper {
  constructor (userEmail){
    super();
    _map( [
      'guid',
      'subject',
      'securityProfile',
      'message',
      'replyEnabled',
      'uploadUrl',
      'publicEncryptionKey',
      'notificationLanguage',
    ], (v) => this[v] = null);
    this.userEmail = userEmail;
    map.set(this, { recipients: [], attachments: [] });
    Object.preventExtensions(this);
  }

  set recipients(value) {
    if (!_isArray(value)){
      throw new Exception.SendSecureException('0', 'recipients must be an Array of Recipient\s');
    }
    map.get(this).recipients = value;
  }

  get recipients() {
    return map.get(this).recipients;
  }

  set attachments(value) {
    if (!_isArray(value)){
      throw new Exception.SendSecureException('0', 'attachments must be an Array of Attachment\'s');
    }
    map.get(this).attachments = value;
  }

  get attachments() {
    return map.get(this).attachments;
  }


  underscorifyKeys(){
    let value = super.underscorifyKeys();
    return _extend(value, {recipients: _map(this.recipients, (item) => item.underscorifyKeys())});
  }

  toJson(){
    let profile = this.securityProfile;
    let attachments = this.attachments;
    delete this.securityProfile;
    delete this.attachments;
    let result = this.underscorifyKeys();
    result.security_profile_id = profile.id;
    result.document_ids = _reduce(attachments, (result, att) => {
      result.push(att.guid);
      return result;
    }, []);
    result.group_replies = profile.groupReplies.value;
    result.expiration_value = profile.expirationValue.value;
    result.expiration_unit = profile.expirationUnit.value;
    result.retention_period_type = profile.retentionPeriodType.value;
    result.retention_period_value = profile.retentionPeriodValue.value;
    result.retention_period_unit = profile.retentionPeriodUnit.value;
    result.encrypt_message = profile.encryptMessage.value;
    result.double_encryption = profile.doubleEncryption.value;
    result.reply_enabled = profile.replyEnabled.value;
    result.notification_language = this.notificationLanguage || 'en';
    return JSON.stringify({ safebox: result });
  }



}
