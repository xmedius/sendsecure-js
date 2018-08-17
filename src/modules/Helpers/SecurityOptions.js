import BaseHelper from './BaseHelper.js';
import Value from './Value.js';
import _map from 'lodash/map';
import { camelCasify } from '../Utils/helperFunctions.js';

let map = new WeakMap();

export default class SecurityOptions extends BaseHelper {
  constructor(object) {
    super();
    object = camelCasify(object);
    this.replyEnabled = this.property(object, 'replyEnabled').orNull();
    this.groupReplies = this.property(object, 'groupReplies').orNull();
    this.retentionPeriodType = this.property(object, 'retentionPeriodType').orNull(); //[discard_at_expiration, retain_at_expiration, do_not_discard]
    this.retentionPeriodValue = this.property(object, 'retentionPeriodValue').orNull();
    this.retentionPeriodUnit = this.property(object, 'retentionPeriodUnit').orNull();
    this.encryptMessage = this.property(object, 'encryptMessage').orNull();
    this.doubleEncryption = this.property(object, 'doubleEncryption').orNull();
    this.expirationValue = this.property(object, 'expirationValue').orNull();
    this.expirationUnit = this.property(object, 'expirationUnit').orNull();
    this.expirationDate = null;
    this.expirationTime = null;
    this.expirationTimeZone = null;
    map.set(this, {
      securityCodeLength: this.property(object, 'securityCodeLength').orNull(),
      codeTimeLimit: this.property(object, 'codeTimeLimit').orNull(),
      allowedLoginAttempts: this.property(object, 'allowedLoginAttempts').orNull(),
      allowRememberMe: this.property(object, 'allowRememberMe').orNull(),
      allowSms: this.property(object, 'allowSms').orNull(),
      allowVoice: this.property(object, 'allowVoice').orNull(),
      allowEmail: this.property(object, 'allowEmail').orNull(),
      twoFactorRequired: this.property(object, 'twoFactorRequired').orNull(),
      autoExtendValue: this.property(object, 'autoExtendValue').orNull(),
      autoExtendUnit: this.property(object, 'autoExtendUnit').orNull(),
      allowManualDelete: this.property(object, 'allowManualDelete').orNull(),
      allowManualClose: this.property(object, 'allowManualClose').orNull(),
      encryptAttachments: this.property(object,'encryptAttachments').orNull(),
      consentGroupId: this.property(object,'consentGroupId').orNull()
    });
    Object.seal(this);
  }

  get securityCodeLength() {
    return map.get(this).securityCodeLength;
  }

  get codeTimeLimit() {
    return map.get(this).codeTimeLimit;
  }

  get allowedLoginAttempts() {
    return map.get(this).allowedLoginAttempts;
  }

  get allowRememberMe() {
    return map.get(this).allowRememberMe;
  }

  get allowSms() {
    return map.get(this).allowSms;
  }

  get allowVoice() {
    return map.get(this).allowVoice;
  }

  get allowEmail() {
    return map.get(this).allowEmail;
  }

  get twoFactorRequired() {
    return map.get(this).twoFactorRequired;
  }

  get autoExtendValue() {
    return map.get(this).autoExtendValue;
  }

  get autoExtendUnit() {
    return map.get(this).autoExtendUnit;
  }

  get allowManualDelete() {
    return map.get(this).allowManualDelete;
  }

  get allowManualClose() {
    return map.get(this).allowManualClose;
  }

  get encryptAttachments() {
    return map.get(this).encryptAttachments;
  }

  get consentGroupId() {
    return map.get(this).consentGroupId;
  }

  toObject(){
    return {
      replyEnabled: this.replyEnabled,
      groupReplies: this.groupReplies,
      retentionPeriodType: this.retentionPeriodType,
      retentionPeriodValue: this.retentionPeriodValue,
      retentionPeriodUnit: this.retentionPeriodUnit,
      encryptMessage: this.encryptMessage,
      doubleEncryption: this.doubleEncryption,
      expirationValue: this.expirationValue,
      expirationUnit: this.expirationUnit,
      securityCodeLength: this.securityCodeLength,
      codeTimeLimit: this.codeTimeLimit,
      allowedLoginAttempts: this.allowedLoginAttempts,
      allowRememberMe: this.allowRememberMe,
      allowSms: this.allowSms,
      allowVoice: this.allowVoice,
      allowEmail: this.allowEmail,
      twoFactorRequired: this.twoFactorRequired,
      autoExtendValue: this.autoExtendValue,
      autoExtendUnit: this.autoExtendUnit,
      allowManualDelete: this.allowManualDelete,
      allowManualClose: this.allowManualClose,
      encryptAttachments: this.encryptAttachments,
      consentGroupId: this.consentGroupId
    };
  }

}
