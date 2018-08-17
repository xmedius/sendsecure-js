import SendSecure from '../../../src/sendsecure.js';
let expect = require('chai').expect;

export default describe('SecurityProfile', () => {
  let profile = new SendSecure.Helpers.SecurityProfile({
    id: 10,
    name: 'email-only',
    description: '',
    created_at: '2016-04-27T21:08:29.457Z',
    updated_at: '2016-07-27T19:03:05.883Z',
    allowed_login_attempts: { value: 3, modifiable: false },
    allow_remember_me: { value: false, modifiable: false },
    allow_sms: { value: false, modifiable: false },
    allow_voice: { value: false, modifiable: false },
    allow_email: { value: true, modifiable: false },
    code_time_limit: { value: 5, modifiable: false },
    code_length: { value: 4, modifiable: false },
    auto_extend_value: { value: 3, modifiable: false },
    auto_extend_unit: { value: 'days', modifiable: false },
    two_factor_required: { value: true, modifiable: false },
    encrypt_attachments: { value: true, modifiable: false },
    encrypt_message: { value: false, modifiable: false },
    expiration_value: { value: 7, modifiable: false },
    expiration_unit: { value: 'hours', modifiable: false },
    reply_enabled: { value: true, modifiable: false },
    group_replies: { value: false, modifiable: false },
    double_encryption: { value: true, modifiable: false },
    retention_period_type: { value: 'discard_at_expiration', modifiable: false },
    retention_period_value: { value: null, modifiable: false },
    retention_period_unit: { value: null, modifiable: false }
  });

  it('create security profile with all the attributes', () => {
    expect(profile.id).to.equal(10);
    expect(profile.name).to.equal('email-only');
    expect(profile.description).to.equal('');
    expect(profile.createdAt).to.equal('2016-04-27T21:08:29.457Z');
    expect(profile.updatedAt).to.equal('2016-07-27T19:03:05.883Z');

    expect(profile.allowedLoginAttempts).to.be.an.instanceof(SendSecure.Helpers.Value);
    expect(profile.allowedLoginAttempts.value).to.equal(3);
    expect(profile.allowedLoginAttempts.modifiable).to.equal(false);

    [ profile.allowRememberMe,
      profile.allowSms,
      profile.allowVoice,
      profile.allowEmail,
      profile.codeTimeLimit,
      profile.codeLength,
      profile.autoExtendValue,
      profile.autoExtendUnit,
      profile.twoFactorRequired,
      profile.encryptAttachments,
      profile.encryptMessage,
      profile.expirationValue,
      profile.expirationUnit,
      profile.replyEnabled,
      profile.groupReplies,
      profile.doubleEncryption,
      profile.retentionPeriodType,
      profile.retentionPeriodValue,
      profile.retentionPeriodUnit
    ].every(val => expect(val).to.be.an.instanceOf(SendSecure.Helpers.Value));
  });

});