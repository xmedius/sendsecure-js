import BaseHelper from './BaseHelper.js';
import Value from './Value.js';
import { camelCasify } from '../Utils/helperFunctions.js';

let map = new WeakMap();

export default class SecurityProfile extends BaseHelper {
  constructor(object) {
    super();
    object = camelCasify(object);
    map.set(this, {
        id: this.property(object, 'id').orNull(),
        name: this.property(object, 'name').orNull(),
        description: this.property(object, 'description').orNull(),
        createdAt: this.property(object, 'createdAt').orNull(),
        updatedAt: this.property(object, 'updatedAt').orNull(),
        allowedLoginAttempts: this.property(object,'allowedLoginAttempts').using(v => new Value(object.allowedLoginAttempts)).orNull(),
        allowRememberMe: this.property(object,'allowRememberMe').using(v => new Value(object.allowRememberMe)).orNull(),
        allowSms: this.property(object,'allowSms').using(v => new Value(object.allowSms)).orNull(),
        allowVoice: this.property(object,'allowVoice').using(v => new Value(object.allowVoice)).orNull(),
        allowEmail: this.property(object,'allowEmail').using(v => new Value(object.allowEmail)).orNull(),
        codeTimeLimit: this.property(object,'codeTimeLimit').using(v => new Value(object.codeTimeLimit)).orNull(),
        codeLength: this.property(object,'codeLength').using(v => new Value(object.codeLength)).orNull(),
        autoExtendValue: this.property(object,'autoExtendValue').using(v => new Value(object.autoExtendValue)).orNull(),
        autoExtendUnit: this.property(object,'autoExtendUnit').using(v => new Value(object.autoExtendUnit)).orNull(),
        twoFactorRequired: this.property(object,'twoFactorRequired').using(v => new Value(object.twoFactorRequired)).orNull(),
        encryptAttachments: this.property(object,'encryptAttachments').using(v => new Value(object.encryptAttachments)).orNull(),
        encryptMessage: this.property(object,'encryptMessage').using(v => new Value(object.encryptMessage)).orNull(),
        expirationValue: this.property(object,'expirationValue').using(v => new Value(object.expirationValue)).orNull(),
        expirationUnit: this.property(object,'expirationUnit').using(v => new Value(object.expirationUnit)).orNull(),
        replyEnabled: this.property(object,'replyEnabled').using(v => new Value(object.replyEnabled)).orNull(),
        groupReplies: this.property(object,'groupReplies').using(v => new Value(object.groupReplies)).orNull(),
        doubleEncryption: this.property(object,'doubleEncryption').using(v => new Value(object.doubleEncryption)).orNull(),
        retentionPeriodType: this.property(object,'retentionPeriodType').using(v => new Value(object.retentionPeriodType)).orNull(),
        retentionPeriodValue: this.property(object,'retentionPeriodValue').using(v => new Value(object.retentionPeriodValue)).orNull(),
        retentionPeriodUnit: this.property(object,'retentionPeriodUnit').using(v => new Value(object.retentionPeriodUnit)).orNull(),
        allowManualDelete: this.property(object,'allowManualDelete').using(v => new Value(object.allowManualDelete)).orNull(),
        allowManualClose: this.property(object,'allowManualClose').using(v => new Value(object.allowManualClose)).orNull(),
        allowForSecureLinks: this.property(object,'allowForSecureLinks').using(v => new Value(object.allowForSecureLinks)).orNull(),
        useCaptcha: this.property(object,'useCaptcha').using(v => new Value(object.useCaptcha)).orNull(),
        verifyEmail: this.property(object,'verifyEmail').using(v => new Value(object.verifyEmail)).orNull(),
        distributeKey: this.property(object,'distributeKey').using(v => new Value(object.distributeKey)).orNull(),
        consentGroupId: this.property(object,'consentGroupId').using(v => new Value(object.consentGroupId)).orNull()
    });
    Object.seal(this);
  }

  get id(){
    return map.get(this).id;
  }

  get name(){
    return map.get(this).name;
  }

  get description(){
    return map.get(this).description;
  }

  get createdAt(){
    return map.get(this).createdAt;
  }

  get updatedAt(){
    return map.get(this).updatedAt;
  }

  get allowedLoginAttempts(){
    return map.get(this).allowedLoginAttempts;
  }

  get allowRememberMe(){
    return map.get(this).allowRememberMe;
  }

  get allowSms(){
    return map.get(this).allowSms;
  }

  get allowVoice(){
    return map.get(this).allowVoice;
  }

  get allowEmail(){
    return map.get(this).allowEmail;
  }

  get codeTimeLimit(){
    return map.get(this).codeTimeLimit;
  }

  get codeLength(){
    return map.get(this).codeLength;
  }

  get autoExtendValue(){
    return map.get(this).autoExtendValue;
  }

  get autoExtendUnit(){
    return map.get(this).autoExtendUnit;
  }

  get twoFactorRequired() {
    return map.get(this).twoFactorRequired;
  }

  get encryptAttachments() {
    return map.get(this).encryptAttachments;
  }

  get encryptMessage() {
    return map.get(this).encryptMessage;
  }

  get expirationValue() {
    return map.get(this).expirationValue;
  }

  get expirationUnit() {
    return map.get(this).expirationUnit;
  }

  get replyEnabled() {
    return map.get(this).replyEnabled;
  }

  get groupReplies() {
    return map.get(this).groupReplies;
  }

  get doubleEncryption() {
    return map.get(this).doubleEncryption;
  }

  get retentionPeriodType() {
    return map.get(this).retentionPeriodType;
  }

  get retentionPeriodValue() {
    return map.get(this).retentionPeriodValue;
  }

  get retentionPeriodUnit() {
    return map.get(this).retentionPeriodUnit;
  }

  get allowManualDelete() {
    return map.get(this).allowManualDelete;
  }

  get allowManualClose() {
    return map.get(this).allowManualClose;
  }

  get allowForSecureLinks() {
    return map.get(this).allowForSecureLinks;
  }

  get useCaptcha() {
    return map.get(this).useCaptcha;
  }

  get verifyEmail() {
    return map.get(this).verifyEmail;
  }

  get distributeKey() {
    return map.get(this).distributeKey;
  }

  get consentGroupId() {
    return map.get(this).consentGroupId;
  }

}
