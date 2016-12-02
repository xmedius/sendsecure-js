import _isObject from 'lodash/isObject'
import _isArray from 'lodash/isArray'
import _reduce from 'lodash/reduce'
import _map from 'lodash/map'

export default class Safebox {
  constructor (userEmail){
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
  }


  toJson(){
    const underscorify = (s) => s.replace(/([A-Z])/g, function(m){return `_${m.toLowerCase()}`;});
    let profile = this.securityProfile;
    let attachments = this.attachments;
    delete this.securityProfile;
    delete this.attachments;
    let result = _reduce(this, (res, value, key) => {
      let json = null;
      if (_isObject(value)){
        if (_isArray(value)){
          json = _map(value, (e) => { return e.underscorify() } )
        } else {
          json = value.underscorify();
        }
      } else {
        json = value;
      }
      res[underscorify(key)] = json;
      return res;
    }, {})
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
