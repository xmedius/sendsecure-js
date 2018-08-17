import SendSecure from '../../../src/sendsecure.js';
let chai = require ('chai');
let sinon = require('sinon');
let sinonChai = require ('sinon-chai');
chai.use(sinonChai);
let expect = require('chai').expect;

export default describe('SafeboxMethods', () => {
  let client = new SendSecure.Client(14254, 'USER|489b3b1f-b411-428e-be5b-2abbace87689', 'empire', 'https://sendsecure.awesome.com','en');
  let safebox = new SendSecure.Helpers.Safebox({ guid: '1c820789a50747df8746aa5d71922a3f',
    user_email: 'user@acme.com',
    participants: [
      { email: 'recipient@test.xmedius.com',
        guest_options: {
          contact_methods: [
            { destination_type: 'cell_phone',
              destination: '+15145550000' }
          ]}
      }],
    user_id: 3,
    enterprise_id: 1,
    subject: 'test',
    expiration: '2018-06-06T05:38:09.951Z',
    notification_language: 'en',
    status: 'in_progress',
    security_profile_name: 'email-only',
    security_code_length: 4,
    allowed_login_attempts: 3,
    allow_remember_me: false,
    allow_sms: false,
    allow_voice: false,
    allow_email: true,
    reply_enabled: true,
    group_replies: false,
    code_time_limit: 5,
    encrypt_message: false,
    two_factor_required: true,
    auto_extend_value: 3,
    auto_extend_unit: 'days',
    retention_period_type: 'discard_at_expiration',
    retention_period_value: null,
    retention_period_unit: null,
    delete_content_on: null,
    preview_url: 'http://sendsecure.lvh.me:3001/s/5b8e88acc9c44b229ba64256298f9388/preview?k=AyOmyAawJXKepb9LuJAOyiJXvkpEQcdSweS2-It3jaRntO9rRyCaciv7QBt5Dqoz',
    encryption_key: 'AyOmyAawJXKepb9LuJAOyiJXvkpEQcdSweS2-It3jaRntO9rRyCaciv7QBt5Dqoz',
    created_at: '2016-12-05T22:38:09.965Z',
    updated_at: '2016-12-05T22:38:09.965Z',
    latest_activity: '2016-12-05T22:38:10.068Z'
  });

  let message = new SendSecure.Helpers.Message({
    id: 145926,
    note: 'Lorem Ipsum...',
    note_size: 148,
    read: true,
    author_id: '3',
    author_type: 'guest',
    created_at: '2017-04-05T14:49:35.198Z',
    documents: []
  });

  beforeEach(() => {
    safebox.guid = '1c820789a50747df8746aa5d71922a3f';
  });

  describe('.addTime', () => {
    it('raises an exception when safebox guid is null', () => {
      safebox.guid = null;
      expect(client.addTime.bind(client, safebox, 3, 'weeks')).to.throw('SafeBox GUID cannot be null');
    });

    it('raises an exception when safebox time unit is invalid', () => {
      expect(client.addTime.bind(client, safebox, 3, 'unit')).to.throw('Invalid time unit');
    });

    it('return new expiration on success', () => {
      let timeParams = { safebox: { add_time_value: 3, add_time_unit: 'weeks' }};
      let response = {
        result: true,
        message: 'SafeBox duration successfully extended.',
        new_expiration: '2016-15-06T05:38:09.951Z'
      };
      sinon.stub(client.jsonClient, 'addTime').withArgs(safebox.guid, JSON.stringify(timeParams)).resolves(response);
      return client.addTime(safebox, 3, 'weeks').then(result => {
        expect(result.new_expiration).to.equal('2016-15-06T05:38:09.951Z');
        expect(safebox.expiration).to.equal('2016-15-06T05:38:09.951Z');
      });
    });
  });

  describe('.closeSafebox', () => {
    it('raises an exception when safebox guid is null', () => {
      safebox.guid = null;
      expect(client.closeSafebox.bind(client, safebox)).to.throw('SafeBox GUID cannot be null');
    });

    it('return the result on success', () => {
      let response = {
        result: true,
        message: 'SafeBox successfully closed.' };
      sinon.stub(client.jsonClient, 'closeSafebox').withArgs(safebox.guid).resolves(response);
      return client.closeSafebox(safebox).then(result => {
        expect(result.message).to.equal('SafeBox successfully closed.');
      });
    });
  });

  describe('.deleteSafeboxContent', () => {
    it('raises an exception when safebox guid is null', () => {
      safebox.guid = null;
      expect(client.deleteSafeboxContent.bind(client, safebox)).to.throw('SafeBox GUID cannot be null');
    });

    it('return the result on success', () => {
      let response = {
        result: true,
        message: 'SafeBox content successfully deleted.' };
      sinon.stub(client.jsonClient, 'deleteSafeboxContent').withArgs(safebox.guid).resolves(response);
      return client.deleteSafeboxContent(safebox).then(result => {
        expect(result.message).to.equal('SafeBox content successfully deleted.');
      });
    });
  });

  describe('.markAsRead', () => {
    it('raises an exception when safebox guid is null', () => {
      safebox.guid = null;
      expect(client.markAsRead.bind(client, safebox)).to.throw('SafeBox GUID cannot be null');
    });

    it('return the result on success', () => {
      let response = { result: true };
      sinon.stub(client.jsonClient, 'markAsRead').withArgs(safebox.guid).resolves(response);
      return client.markAsRead(safebox).then(result => {
        expect(result.result).to.be.true;
      });
    });
  });

  describe('.markAsUnread', () => {
    it('raises an exception when safebox guid is null', () => {
      safebox.guid = null;
      expect(client.markAsUnread.bind(client, safebox)).to.throw('SafeBox GUID cannot be null');
    });

    it('return the result on success', () => {
      let response = { result: true };
      sinon.stub(client.jsonClient, 'markAsUnread').withArgs(safebox.guid).resolves(response);
      return client.markAsUnread(safebox).then(result => {
        expect(result.result).to.be.true;
      });
    });
  });

  describe('.markAsReadMessage', () => {
    it('raises an exception when safebox guid is null', () => {
      safebox.guid = null;
      expect(client.markAsReadMessage.bind(client, safebox, message)).to.throw('SafeBox GUID cannot be null');
    });

    it('raises an exception when message is null', () => {
      expect(client.markAsReadMessage.bind(client, safebox, null)).to.throw('Message cannot be null');
    });

    it('return the result on success', () => {
      let response = { result: true };
      sinon.stub(client.jsonClient, 'markAsReadMessage').withArgs(safebox.guid, message.id).resolves(response);
      return client.markAsReadMessage(safebox, message).then(result => {
        expect(result.result).to.be.true;
      });
    });
  });

  describe('.markAsUnreadMessage', () => {
    it('raises an exception when safebox guid is null', () => {
      safebox.guid = null;
      expect(client.markAsUnreadMessage.bind(client, safebox, message)).to.throw('SafeBox GUID cannot be null');
    });

    it('raises an exception when message is null', () => {
      expect(client.markAsUnreadMessage.bind(client, safebox, null)).to.throw('Message cannot be null');
    });

    it('return the result on success', () => {
      let response = { result: true };
      sinon.stub(client.jsonClient, 'markAsUnreadMessage').withArgs(safebox.guid, message.id).resolves(response);
      return client.markAsUnreadMessage(safebox, message).then(result => {
        expect(result.result).to.be.true;
      });
    });
  });

  describe('.getAuditRecordPdfUrl', () => {
    it('raises an exception when safebox guid is null', () => {
      safebox.guid = null;
      expect(client.getAuditRecordPdf.bind(client, safebox)).to.throw('SafeBox GUID cannot be null');
    });

    it('return the result on success', () => {
      let response = { url: 'http://sendsecure.integration.xmedius.com/s/07377f0e7296437bbfdb578576a799ac.pdf' };
      sinon.stub(client.jsonClient, 'getAuditRecordPdfUrl').withArgs(safebox.guid).resolves(response);
      return client.getAuditRecordPdfUrl(safebox).then(result => {
        expect(result).to.equal(response.url);
      });
    });
  });

  describe('.getSafeboxInfo', () => {
    it('raises an exception when safebox guid is null', () => {
      safebox.guid = null;
      expect(client.getSafeboxInfo.bind(client, safebox)).to.throw('SafeBox GUID cannot be null');
    });

    it('return updated safebox on sucess', () => {
      let response = { safebox: {
        guid: '73af62f766ee459e81f46e4f533085a4',
        user_id: 1,
        enterprise_id: 1,
        participants: [
          { id: '7a3c51e00a004917a8f5db807180fcc5',
            guest_options: {},
            message_read_count: 0,
            message_total_count: 1 },
          { id: '1',
            first_name: 'Jane',
            last_name: 'Doe',
            email: 'jane.doe@example.com',
            type: 'user',
            role: 'owner',
            message_read_count: 0,
            message_total_count: 1 }
        ],
        security_options: {
          security_code_length: 4
        },
        messages: [
          { note: 'Lorem Ipsum...',
            note_size: 123,
            documents: [] }
        ],
        download_activity: {
          guests: [
            { id: '42220c777c30486e80cd3bbfa7f8e82f',
              documents: [] }
          ],
          owner: {
            id: 1,
            documents: []
          }
        },
        event_history: [
          { type: 'safebox_created_owner',
            date: '2018-06-21T18:09:05.966Z',
            metadata: {},
            message: 'SafeBox créée par user4815@gmail.com avec 0 pièce(s) jointe(s) depuis 192.168.0.1 pour john44@example.com' }
        ]
      }};
      sinon.stub(client.jsonClient, 'getSafeboxInfo').withArgs(safebox.guid, '')
      .resolves(response);
      return client.getSafeboxInfo(safebox).then(result => {
        expect(result).to.be.an.instanceOf(SendSecure.Helpers.Safebox);
        expect([
          'securityOptions',
          'participants',
          'messages',
          'downloadActivity',
          'eventHistory'].every(v => v in result)).to.not.be.empty;
      });
    });
  });

  describe('.getSafeboxParticipants', () => {
    it('raises an exception when safebox guid is null', () => {
      safebox.guid = null;
      expect(client.getSafeboxParticipants.bind(client, safebox)).to.throw('SafeBox GUID cannot be null');
    });

    it('return a list of participants', () => {
      let response = { participants: [
        { id: '7a3c51e00a004917a8f5db807180fcc5',
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
            contact_methods: [
              { id: 1,
                destination: '+15145550000',
                destination_type: 'office_phone',
                verified: false,
                created_at: '2017-04-28T17:14:55.304Z',
                updated_at: '2017-04-28T17:14:55.304Z' }
            ]
          }
        },
        { id: '1',
          first_name: 'Jane',
          last_name: 'Doe',
          email: 'jane.doe@example.com',
          type: 'user',
          role: 'owner' }
      ]};
      sinon.stub(client.jsonClient, 'getSafeboxParticipants').withArgs(safebox.guid).resolves(response);
      return client.getSafeboxParticipants(safebox).then(result => {
        expect(result.length).to.equal(2);
        expect(result[0]).to.be.an.instanceOf(SendSecure.Helpers.Participant);
        expect(result[0].guestOptions).to.be.an.instanceOf(SendSecure.Helpers.GuestOptions);
        expect(result[0].id).to.equal(response.participants[0].id);
        expect(result[0].guestOptions.contactMethods.length).to.equal(1);
        expect(result[1]).to.be.an.instanceOf(SendSecure.Helpers.Participant);
        expect(result[1].id).to.equal(response.participants[1].id);
      });
    });
  });

  describe('.getSafeboxMessages', () => {
    it('raises an exception when safebox guid is null', () => {
      safebox.guid = null;
      expect(client.getSafeboxMessages.bind(client, safebox)).to.throw('SafeBox GUID cannot be null');
    });

    it('return safebox messages on success', () => {
      let response = { messages: [{
        note: 'Lorem Ipsum...',
        note_size: 148,
        read: true,
        author_id: '3',
        author_type: 'guest',
        created_at: '2017-04-05T14:49:35.198Z',
        documents: [
          {
            id: '5a3df276aaa24e43af5aca9b2204a535',
            name: 'Axient-soapui-project.xml',
            sha: '724ae04430315c60ca17f4dbee775a37f5b18c91fde6eef24f77a605aee99c9c',
            size: 129961,
            url: 'https://sendsecure.integration.xmedius.com/api/v2/safeboxes/b4d898ada15f42f293e31905c514607f/documents/5a3df276aaa24e43af5aca9b2204a535/url'
          }]
      }]};

      sinon.stub(client.jsonClient, 'getSafeboxMessages').withArgs(safebox.guid).resolves(response);
      return client.getSafeboxMessages(safebox).then(result => {
        expect(result.length).to.equal(1);
        expect(result[0]).to.be.an.instanceOf(SendSecure.Helpers.Message);
        expect(result[0].documents[0]).to.be.an.instanceOf(SendSecure.Helpers.MessageDocument);
        expect(result[0].documents[0].id).to.deep.equal(response.messages[0].documents[0].id);
      });
    });
  });

  describe('.getSafeboxSecurityOptions', () => {
    it('raises an exception when safebox guid is null', () => {
      safebox.guid = null;
      expect(client.getSafeboxSecurityOptions.bind(client, safebox)).to.throw('SafeBox GUID cannot be null');
    });

    it('return safebox security options on success', () => {
      let response = { security_options:
      { security_code_length: 4,
        allowed_login_attempts: 3,
        allow_remember_me: true
      }};

      sinon.stub(client.jsonClient, 'getSafeboxSecurityOptions').withArgs(safebox.guid).resolves(response);
      return client.getSafeboxSecurityOptions(safebox).then(result => {
        expect(result).to.be.an.instanceOf(SendSecure.Helpers.SecurityOptions);
        expect(result.securityCodeLength).to.equal(response.security_options.security_code_length);
        expect(result.allowedLoginAttempts).to.equal(response.security_options.allowed_login_attempts);
        expect(result.allowRememberMe).to.equal(response.security_options.allow_remember_me);
      });
    });
  });

  describe('.getSafeboxDownloadActivity', () => {
    it('raises an exception when safebox guid is null', () => {
      safebox.guid = null;
      expect(client.getSafeboxDownloadActivity.bind(client, safebox)).to.throw('SafeBox GUID cannot be null');
    });

    it('return safebox download activity on success', () => {
      let response = { download_activity:
      { guests: [
        { id: '42220c777c30486e80cd3bbfa7f8e82f',
          documents: []
        },
        { id: '76016c0938964578b6674e96b31ac036',
          documents: []
        }],
        owner: { id: 1, documents: []}
      }};

      sinon.stub(client.jsonClient, 'getSafeboxDownloadActivity').withArgs(safebox.guid).resolves(response);
      return client.getSafeboxDownloadActivity(safebox).then(result => {
        expect(result).to.be.an.instanceOf(SendSecure.Helpers.DownloadActivity);
        expect(result.guests.length).to.equal(2);
        expect(result.guests[0].id).to.equal(response.download_activity.guests[0].id);
        expect(result.guests[1].id).to.equal(response.download_activity.guests[1].id);
        expect(result.owner).to.be.an.instanceOf(SendSecure.Helpers.DownloadActivityDetail);
        expect(result.owner.id).to.equal(response.download_activity.owner.id);
      });
    });
  });

  describe('.getSafeboxEventHistory', () => {
    it('raises an exception when safebox guid is null', () => {
      safebox.guid = null;
      expect(client.getSafeboxEventHistory.bind(client, safebox)).to.throw('SafeBox GUID cannot be null');
    });

    it('return safebox event history on success', () => {
      let response = { event_history: [
        { type: '42220c777c30486e80cd3bbfa7f8e82f',
          date: [],
          metadata: {},
          message: 'SafeBox created by john.smith@example.com with 0 attachment(s) from 0.0.0.0 for john.smith@example.com'
        }
      ]};

      sinon.stub(client.jsonClient, 'getSafeboxEventHistory').withArgs(safebox.guid).resolves(response);
      return client.getSafeboxEventHistory(safebox).then(result => {
        expect(result.length).to.equal(1);
        expect(result[0]).to.be.an.instanceOf(SendSecure.Helpers.EventHistory);
        expect(['type', 'date', 'metadata', 'message'].every(v => result[0][v] == response.event_history[0][v])).to.be.true;
      });
    });
  });

  describe('.reply', () => {
    let attachment = new SendSecure.Helpers.Attachment({
      filename: 'simple.pdf',
      stream: new Buffer([0x61, 0x0a]),
      contentType: 'text/plain'
    });
    let reply = new SendSecure.Helpers.Reply({
      message: 'Hello World!',
      consent: true
    });
    reply.addAttachment(attachment);
    let params = {
      fileStream: attachment.stream,
      contentType: attachment.contentType,
      filename: attachment.filename
    };
    let fileParams = safebox.temporaryDocument(attachment.stream.length);
    it('return result on success', () => {
      let newFileResponse = {
        temporary_document_guid: '343c79aa061544a7a122f37dc6e0318e',
        upload_url: 'http://fileserver.lvh.me/xmss/DteeDmb-2zfN5WtC...7111OcWbl96EVtI='
      };
      let uploadFileResponse = { temporary_document:
        { document_guid: '343c79aa061544a7a122f37dc6e0318e' }
      };
      sinon.stub(client.jsonClient, 'newFile').withArgs(safebox.guid, JSON.stringify(fileParams))
      .resolves(newFileResponse);
      sinon.stub(client.jsonClient, 'uploadFile').withArgs(newFileResponse.upload_url, params)
      .resolves(uploadFileResponse);
      let replyJson = JSON.stringify({ safebox:
      { message: 'Hello World!',
        consent: true,
        document_ids: ['343c79aa061544a7a122f37dc6e0318e']
      }});
      sinon.stub(client.jsonClient, 'reply').withArgs(safebox.guid, replyJson)
      .resolves({ result: true, message: 'SafeBox successfully updated.' });
      return client.reply(safebox, reply).then(res => {
        expect(res.result).to.be.true;
        expect(res.message).to.equal('SafeBox successfully updated.');
      });
    });
  });

});