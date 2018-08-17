import _reduce from 'lodash/reduce';
import _extend from 'lodash/extend';
import _map from 'lodash/map';
import _flatten from 'lodash/flatten';
import _partial from 'lodash/partial';
import BaseHelper from './BaseHelper.js';
import SecurityOptions from './SecurityOptions.js';
import Message from './Message.js';
import DownloadActivity from './DownloadActivity.js';
import EventHistory from './EventHistory.js';
import Participant from './Participant.js';
import Attachment from './Attachment.js';
import * as Exception from '../sendSecureException.js';
import { camelCasify } from '../Utils/helperFunctions.js';

let map = new WeakMap();

export default class Safebox extends BaseHelper {
  constructor (object){
    super();
    object = camelCasify(object);
    _map( [
      'guid',
      'userEmail',
      'subject',
      'message',
      'uploadUrl',
      'publicEncryptionKey',
      'notificationLanguage',
      'securityProfileId',
      'expiration',
      'emailNotificationEnabled'
    ], (v) => this[v] = this.property(object, v).orNull());
    this.securityOptions = this.property(object, 'securityOptions').using(v => new SecurityOptions(object.securityOptions)).orDefault(new SecurityOptions());
    map.set(this, {
      participants: this.property(object,'participants').using(_partial(_map, _partial.placeholder, v => new Participant(v))).orDefault([]),
      attachments: this.property(object,'attachments').using(_partial(_map, _partial.placeholder, v => new Attachment(v))).orDefault([]),
      userId: this.property(object, 'userId').orNull(),
      enterpriseId: this.property(object, 'enterpriseId').orNull(),
      status: this.property(object, 'status').orNull(), //[in_progress, closed, content_deleted]
      securityProfileName: this.property(object, 'securityProfileName').orNull(),
      unreadCount: this.property(object, 'unreadCount').orNull(),
      doubleEncryptionStatus: this.property(object, 'doubleEncryptionStatus').orNull(),
      auditRecordPdf: this.property(object, 'auditRecordPdf').orNull(),
      secureLink: this.property(object, 'secureLink').orNull(),
      secureLinkTitle: this.property(object, 'secureLinkTitle').orNull(),
      previewUrl: this.property(object, 'previewUrl').orNull(),
      encryptionKey: this.property(object, 'encryptionKey').orNull(),
      createdAt: this.property(object, 'createdAt').orNull(),
      updatedAt: this.property(object, 'updatedAt').orNull(),
      assignedAt: this.property(object, 'assignedAt').orNull(),
      latestActivity: this.property(object, 'latestActivity').orNull(),
      closedAt: this.property(object, 'closedAt').orNull(),
      contentDeletedAt: this.property(object, 'contentDeletedAt').orNull(),
      messages: this.property(object,'messages').using(_partial(_map, _partial.placeholder, v => new Message(v))).orDefault([]),
      downloadActivity: this.property(object, 'downloadActivity').using( v => new DownloadActivity(object.downloadActivity)).orDefault(new DownloadActivity()),
      eventHistory: this.property(object,'eventHistory').using(_partial(_map, _partial.placeholder, v => new EventHistory(v))).orDefault([])
    });

    Object.preventExtensions(this);
  }

  toObject() {
    return {
      guid: this.guid,
      userEmail: this.userEmail,
      subject: this.subject,
      message: this.message,
      uploadUrl: this.uploadUrl,
      publicEncryptionKey: this.publicEncryptionKey,
      notificationLanguage: this.notificationLanguage,
      securityProfileId: this.securityProfileId,
      expiration: this.expiration,
      securityOptions: this.securityOptions.toObject(),
      participants: this.participants.map(participant => participant.toObject()),
      attachments: this.attachments,
      userId: this.userId,
      enterpriseId: this.enterpriseId,
      status: this.status,
      securityProfileName: this.securityProfileName,
      unreadCount: this.unreadCount,
      doubleEncryptionStatus: this.doubleEncryptionStatus,
      auditRecordPdf: this.auditRecordPdf,
      secureLink: this.secureLink,
      secureLinkTitle: this.secureLinkTitle,
      emailNotificationEnabled: this.emailNotificationEnabled,
      previewUrl: this.previewUrl,
      encryptionKey: this.encryptionKey,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      assignedAt: this.assignedAt,
      latestActivity: this.latestActivity,
      closedAt: this.closedAt,
      contentDeletedAt: this.contentDeletedAt,
      messages: this.messages.map(message => message.toObject()),
      downloadActivity: this.downloadActivity.toObject(),
      eventHistory: this.eventHistory.map(event => event.toObject())
    };
  }

  set participants(...value) {
    map.get(this).participants = _flatten(value);
  }

  get participants() {
    return map.get(this).participants;
  }

  set attachments(...value) {
    map.get(this).attachments = _flatten(value);
  }

  get attachments() {
    return map.get(this).attachments;
  }

  set expirationValues(value) {
    if(this.status) {
      throw new Exception.SendSecureException(0, "Cannot change the expiration of a committed safebox, please see the method addTime to extend the lifetime of the safebox");
    }
    this.securityOptions.expirationDate = value.strDate();
    this.securityOptions.expirationTime = value.strTime();
    this.securityOptions.expirationTimeZone = value.zone();
  }

  get userId() {
    return map.get(this).userId;
  }

  get enterpriseId() {
    return map.get(this).enterpriseId;
  }

  get status() {
    return map.get(this).status;
  }

  get securityProfileName() {
    return map.get(this).securityProfileName;
  }

  get unreadCount() {
    return map.get(this).unreadCount;
  }

  get doubleEncryptionStatus() {
    return map.get(this).doubleEncryptionStatus;
  }

  get auditRecordPdf() {
    return map.get(this).auditRecordPdf;
  }

  get secureLink() {
    return map.get(this).secureLink;
  }

  get secureLinkTitle() {
    return map.get(this).secureLinkTitle;
  }

  get previewUrl() {
    return map.get(this).previewUrl;
  }

  get encryptionKey() {
    return map.get(this).encryptionKey;
  }

  get createdAt() {
    return map.get(this).createdAt;
  }

  get updatedAt() {
    return map.get(this).updatedAt;
  }

  get assignedAt() {
    return map.get(this).assignedAt;
  }

  get latestActivity() {
    return map.get(this).latestActivity;
  }

  get closedAt() {
    return map.get(this).closedAt;
  }

  get contentDeletedAt() {
    return map.get(this).contentDeletedAt;
  }

  get messages() {
    return map.get(this).messages;
  }

  get downloadActivity() {
    return map.get(this).downloadActivity;
  }

  get eventHistory() {
    return map.get(this).eventHistory;
  }

  underscorifyKeys(){
    let value = super.underscorifyKeys();
    return _extend(value, {recipients: _map(this.participants, (item) => item.underscorifyKeys())});
  }

  temporaryDocument(fileSize) {
    return this.publicEncryptionKey ?
    { temporary_document:
      { document_file_size: fileSize },
      multipart: false,
      public_encryption_key: this.publicEncryptionKey
    }
    :
    { temporary_document:
      { document_file_size: fileSize },
      multipart: false
    };
  }

  toJson(){
    let profile = this.securityOptions;
    let attachments = this.attachments;
    delete this.securityOptions;
    delete this.attachments;
    delete this.expiration;
    let result = this.underscorifyKeys();
    result.security_profile_id = this.securityProfileId;
    result.document_ids = _reduce(attachments, (result, att) => {
      result.push(att.guid);
      return result;
    }, []);
    result.group_replies = profile.groupReplies;
    result.expiration_value = profile.expirationValue;
    result.expiration_unit = profile.expirationUnit;
    result.retention_period_type = profile.retentionPeriodType;
    result.retention_period_value = profile.retentionPeriodValue;
    result.retention_period_unit = profile.retentionPeriodUnit;
    result.encrypt_message = profile.encryptMessage;
    result.double_encryption = profile.doubleEncryption;
    result.reply_enabled = profile.replyEnabled;
    result.notification_language = this.notificationLanguage || 'en';
    if(profile.expirationDate) {
      result.expiration_date = profile.expiration_date;
      result.expiration_time = profile.expiration_time;
      result.expiration_time_zone = profile.expiration_time_zone;
    }
    delete result.upload_url;
    return JSON.stringify({ safebox: result });
  }

}

export const TIME_UNIT = { hours: 'hours', days: 'days', weeks: 'weeks', months: 'months' };
export const LONG_TIME_UNIT = { hours: 'hours', days: 'days', weeks: 'weeks', months: 'months', years:'years' };

export const SECURITY_OPTIONS_KEYS = [
  'securityCodeLength', 'allowedLoginAttempts', 'allowRememberMe', 'allowSms',
  'allowVoice', 'allowEmail', 'replyEnabled', 'groupReplies',
  'codeTimeLimit', 'encryptMessage', 'twoFactorRequired', 'autoExtendValue',
  'autoExtendUnit', 'retentionPeriodType', 'retentionPeriodValue',
  'retentionPeriodUnit', 'allowManualDelete', 'allowManualClose' ];

