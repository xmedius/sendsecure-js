import _reduce from 'lodash/reduce'
import _map from 'lodash/map'
import BaseHelper from './BaseHelper.js'

export default class Safebox extends BaseHelper {
  constructor (userEmail){
    super();
    _map( [
      'guid',
      'recipients',
      'subject',
      'attachments',
      'securityProfile',
      'message',
      'replyEnabled',
      'uploadUrl',
      'publicEncryptionKey',
      'notificationLanguage',
    ], (v) => this[v] = null);
    this.userEmail = userEmail;
    Object.preventExtensions(this);
  }


  toJson(){
    let profile = this.securityProfile;
    let attachments = this.attachments;
    delete this.securityProfile;
    delete this.attachments;
    let result = this.underscorifyKeys();
    result.security_profile_id = profile.id;
    result.document_ids = _reduce(attachments, (result, att) => {
      result.push(att.guid)
      return result;
    }, [])
    result.group_replies = profile.groupReplies.value;
    result.expiration_value = profile.expirationValue.value;
    result.expiration_unit = profile.expirationUnit.value;
    result.retention_period_type = profile.retentionPeriodType.value;
    result.retention_period_value = profile.retentionPeriodValue.value;
    result.retention_period_unit = profile.retentionPeriodUnit.value;
    result.encrypt_message = profile.encryptMessage.value;
    result.double_encryption = profile.doubleEncryption.value;
    result.reply_enabled = profile.replyEnabled.value;
    result.notification_language = 'en'
    return JSON.stringify({ safebox: result })
  }



}
