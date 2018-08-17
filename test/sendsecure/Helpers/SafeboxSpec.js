import SendSecure from '../../../src/sendsecure.js';
let expect = require('chai').expect;

export default describe('Safebox', () => {

  let safebox = new SendSecure.Helpers.Safebox( {
    user_email: 'user@acme.com',
    guid: '1c820789a50747df8746aa5d71922a3f',
    public_encryption_key: 'AyOmyAawJXKepb9LuJAOyiJXvkpEQcdSweS2-It3jaRntO9rRyCaciv7QBt5Dqoz',
    upload_url: 'upload_url',
    participants: [{
      id: '7a3c51e00a004917a8f5db807180fcc5',
      first_name: 'John',
      last_name: 'Smith',
      email: 'john.smith@example.com',
      type: 'guest',
      role: 'guest',
      guest_options: {
        company_name: 'Acme',
        locked: false,
        bounced_email: false,
        failed_login_attempts: 0,
        verified: false,
        contact_methods: [{
          id: 1,
          destination: '+15145550000',
          destination_type: 'office_phone',
          verified: false,
          created_at: '2017-04-28T17:14:55.304Z',
          updated_at: '2017-04-28T17:14:55.304Z' }]
      }},
    { id: '1',
      first_name: 'Jane',
      last_name: 'Doe',
      email: 'jane.doe@example.com',
      type: 'user',
      role: 'owner'
    }],
    attachments: [{
      filename: 'simple.pdf',
      stream: ('stream'),
      contentType: 'application/pdf'
    }],
    message: 'lorem ipsum...',
    subject: 'test subject',
    notification_language: 'fr',
    security_profile_id: 11,
    security_options: {
      security_code_length: 4,
      code_time_limit: 5,
      allowed_login_attempts: 3,
      allow_remember_me: true,
      allow_sms: true,
      allow_voice: true,
      allow_email: false,
      reply_enabled: true,
      group_replies: false,
      expiration_value: 5,
      expiration_unit: 'days',
      retention_period_type: 'do_not_discard',
      retention_period_value: null,
      retention_period_unit: 'hours',
      encrypt_message: true,
      double_encryption: true,
      two_factor_required: true,
      auto_extend_value: 3,
      auto_extend_unit: 'days',
      allow_manual_delete: true,
      allow_manual_close: false
    },
    user_id: 1,
    enterprise_id: 1,
    status: 'in_progress',
    security_profile_name: 'All Contact Method Allowed!',
    unread_count: 0,
    double_encryption_status: 'disabled',
    audit_record_pdf: null,
    secure_link: null,
    secure_link_title: null,
    email_notification_enabled: true,
    preview_url: 'https://sendsecure.integration.xmedius.com/s/845459484b674055bec4ddf2ba5ab60e/preview',
    encryption_key: null,
    created_at: '2017-05-24T14:45:35.062Z',
    updated_at: '2017-05-24T14:45:35.589Z',
    assigned_at: '2017-05-24T14:45:35.040Z',
    latest_activity: '2017-05-24T14:45:35.544Z',
    expiration: '2017-05-31T14:45:35.038Z',
    closed_at: null,
    content_deleted_at: null,
    messages: [{
      note: 'Lorem Ipsum...',
      note_size: 123,
      read: true,
      author_id: '1',
      author_type: 'guest',
      created_at: '2017-04-05T14:49:35.198Z',
      documents: [{
        id: '5a3df276aaa24e43af5aca9b2204a535',
        name: 'Axient-soapui-project.xml',
        sha: '724ae04430315c60ca17f4dbee775a37f5b18c91fde6eef24f77a605aee99c9c',
        size: 12345,
        url: 'https://sendsecure.integration.xmedius.com/api/v2/safeboxes/b4d898ada15f42f293e31905c514607f/documents/5a3df276aaa24e43af5aca9b2204a535/url'
      }]
    }],
    download_activity: {
      guests: [{
        id: '42220c777c30486e80cd3bbfa7f8e82f',
        documents: [{
          id: '5a3df276aaa24e43af5aca9b2204a535',
          downloaded_bytes: 0,
          download_date: null
        }]
      }],
      owner: {
        id: 1,
        documents: []
      }
    },
    event_history: [{
      type: 'safebox_created_owner',
      date: '2017-03-30T18:09:05.966Z',
      metadata: {
        emails: [
          'john44@example.com'
        ],
        attachment_count: 0
      },
      message: 'SafeBox créée par john.smith@example.com avec 0 pièce(s) jointe(s) depuis 192.168.0.1 pour john44@example.com'
    }]
  });

  it('basic attributes', () => {
    expect(safebox.userEmail).to.equal('user@acme.com');
    expect(safebox.guid).to.equal('1c820789a50747df8746aa5d71922a3f');
    expect(safebox.publicEncryptionKey).to.equal('AyOmyAawJXKepb9LuJAOyiJXvkpEQcdSweS2-It3jaRntO9rRyCaciv7QBt5Dqoz');
    expect(safebox.uploadUrl).to.equal('upload_url');
    expect(safebox.message).to.equal('lorem ipsum...');
    expect(safebox.subject).to.equal('test subject');
    expect(safebox.notificationLanguage).to.equal('fr');
    expect(safebox.securityProfileId).to.equal(11);
    expect(safebox.userId).to.equal(1);
    expect(safebox.enterpriseId).to.equal(1);
    expect(safebox.status).to.equal('in_progress');
    expect(safebox.securityProfileName).to.equal('All Contact Method Allowed!');
    expect(safebox.unreadCount).to.equal(0);
    expect(safebox.doubleEncryptionStatus).to.equal('disabled');
    expect(safebox.auditRecordPdf).to.be.null;
    expect(safebox.secureLink).to.be.null;
    expect(safebox.secureLinkTitle).to.be.null;
    expect(safebox.previewUrl).to.equal('https://sendsecure.integration.xmedius.com/s/845459484b674055bec4ddf2ba5ab60e/preview');
    expect(safebox.encryptionKey).to.be.null;
    expect(safebox.createdAt).to.equal('2017-05-24T14:45:35.062Z');
    expect(safebox.updatedAt).to.equal('2017-05-24T14:45:35.589Z');
    expect(safebox.assignedAt).to.equal('2017-05-24T14:45:35.040Z');
    expect(safebox.latestActivity).to.equal('2017-05-24T14:45:35.544Z');
    expect(safebox.expiration).to.equal('2017-05-31T14:45:35.038Z');
    expect(safebox.closedAt).to.be.null;
    expect(safebox.contentDeletedAt).to.be.null;
  });

  it('attachments attributes', () => {
    let attachment = safebox.attachments[0];
    attachment.guid = '123';
    expect(attachment.guid).to.equal('123');
    expect(attachment.filename).to.equal('simple.pdf');
    expect(attachment.stream).to.equal('stream');
    expect(attachment.contentType).to.equal('application/pdf');
  });

  it('security options attributes', () => {
    let securityOptions = safebox.securityOptions;
    expect(securityOptions).to.be.an.instanceof(SendSecure.Helpers.SecurityOptions);
    expect(securityOptions.securityCodeLength).to.equal(4);
    expect(securityOptions.allowedLoginAttempts).to.equal(3);
    expect(securityOptions.expirationValue).to.equal(5);
    expect(securityOptions.expirationUnit).to.equal('days');
    expect(securityOptions.allowRememberMe).to.equal(true);
    expect(securityOptions.allowSms).to.equal(true);
    expect(securityOptions.allowVoice).to.equal(true);
    expect(securityOptions.allowEmail).to.equal(false);
    expect(securityOptions.replyEnabled).to.equal(true);
    expect(securityOptions.groupReplies).to.equal(false);
    expect(securityOptions.codeTimeLimit).to.equal(5);
    expect(securityOptions.encryptMessage).to.equal(true);
    expect(securityOptions.twoFactorRequired).to.equal(true);
    expect(securityOptions.autoExtendValue).to.equal(3);
    expect(securityOptions.autoExtendUnit).to.equal('days');
    expect(securityOptions.retentionPeriodType).to.equal('do_not_discard');
    expect(securityOptions.retentionPeriodValue).to.be.null;
    expect(securityOptions.retentionPeriodUnit).to.equal('hours');
    expect(securityOptions.allowManualDelete).to.equal(true);
    expect(securityOptions.allowManualClose).to.equal(false);
    expect(securityOptions.doubleEncryption).to.equal(true);
  });

  describe('Recipients', () => {

    it('basic attributes', () => {
      expect(safebox.participants.length).to.equal(2);
      let participant = safebox.participants[0];
      expect(participant).to.be.an.instanceof(SendSecure.Helpers.Participant);
      expect(participant.id).to.equal('7a3c51e00a004917a8f5db807180fcc5');
      expect(participant.firstName).to.equal('John');
      expect(participant.lastName).to.equal('Smith');
      expect(participant.email).to.equal('john.smith@example.com');
      expect(participant.type).to.equal('guest');
      expect(participant.role).to.equal('guest');

      participant = safebox.participants[1];
      expect(participant).to.be.an.instanceof(SendSecure.Helpers.Participant);
      expect(participant.id).to.equal('1');
      expect(participant.firstName).to.equal('Jane');
      expect(participant.lastName).to.equal('Doe');
      expect(participant.email).to.equal('jane.doe@example.com');
      expect(participant.type).to.equal('user');
      expect(participant.role).to.equal('owner');
    });

    describe('Guest options', () => {
      it('guest options basic attributes', () => {
        let guestOptions = safebox.participants[0].guestOptions;
        expect(guestOptions).to.be.an.instanceof(SendSecure.Helpers.GuestOptions);
        expect(guestOptions.companyName).to.equal('Acme');
        expect(guestOptions.locked).to.equal(false);
        expect(guestOptions.bouncedEmail).to.equal(false);
        expect(guestOptions.failedLoginAttempts).to.equal(0);
        expect(guestOptions.verified).to.equal(false);
        expect(guestOptions.contactMethods.length).to.equal(1);
      });

      it('contact methods attributes', () => {
        let contact = safebox.participants[0].guestOptions.contactMethods[0];
        expect(contact).to.be.an.instanceof(SendSecure.Helpers.ContactMethod);
        expect(contact.id).to.equal(1);
        expect(contact.destinationType).to.equal('office_phone');
        expect(contact.destination).to.equal('+15145550000');
        expect(contact.verified).to.equal(false);
        expect(contact.createdAt).to.equal('2017-04-28T17:14:55.304Z');
        expect(contact.updatedAt).to.equal('2017-04-28T17:14:55.304Z');
      });

    });

  });

  describe('messages', () => {

    it('basic attributes', () => {
      expect(safebox.messages.length).to.equal(1);
      let message = safebox.messages[0];
      expect(message).to.be.an.instanceof(SendSecure.Helpers.Message);
      expect(message.note).to.equal('Lorem Ipsum...');
      expect(message.noteSize).to.equal(123);
      expect(message.read).to.equal(true);
      expect(message.authorId).to.equal('1');
      expect(message.authorType).to.equal('guest');
      expect(message.createdAt).to.equal('2017-04-05T14:49:35.198Z');
      expect(message.documents.length).to.equal(1);
    });

    it('documents attributes', () => {
      let document = safebox.messages[0].documents[0];
      expect(document).to.be.an.instanceof(SendSecure.Helpers.MessageDocument);
      expect(document.id).to.equal('5a3df276aaa24e43af5aca9b2204a535');
      expect(document.name).to.equal('Axient-soapui-project.xml');
      expect(document.sha).to.equal('724ae04430315c60ca17f4dbee775a37f5b18c91fde6eef24f77a605aee99c9c');
      expect(document.size).to.equal(12345);
      expect(document.url).to.equal('https://sendsecure.integration.xmedius.com/api/v2/safeboxes/b4d898ada15f42f293e31905c514607f/documents/5a3df276aaa24e43af5aca9b2204a535/url');
    });

  });

  it('event history attributes', () => {
    expect(safebox.eventHistory.length).to.equal(1);
    let eventHistory = safebox.eventHistory[0];
    expect(eventHistory).to.be.an.instanceof(SendSecure.Helpers.EventHistory);
    expect(eventHistory.type).to.equal('safebox_created_owner');
    expect(eventHistory.date).to.equal('2017-03-30T18:09:05.966Z');

    let metadata = eventHistory.metadata;
    expect(metadata.emails.length).to.equal(1);
    expect(metadata.emails[0]).to.equal('john44@example.com');
    expect(metadata.attachment_count).to.equal(0);
    expect(eventHistory.message).to.equal('SafeBox créée par john.smith@example.com avec 0 pièce(s) jointe(s) depuis 192.168.0.1 pour john44@example.com');
  });

  describe('.expirationValues', () => {
    let date = new Date('2018-12-17T03:24:00');
    it('raise exception when safebox is already committed', () => {
      expect(() => safebox.expirationValues = date)
      .to.throw('Cannot change the expiration of a committed safebox, please see the method addTime to extend the lifetime of the safebox');
    });
    let sb = new SendSecure.Helpers.Safebox();
    it('update safebox expiration attributes', () => {
      sb.expirationValues = date;
      expect(sb.securityOptions.expirationDate).to.equal(date.strDate());
      expect(sb.securityOptions.expirationTime).to.equal(date.strTime());
      expect(sb.securityOptions.expirationTimeZone).to.equal(date.zone());
    });

  });

});