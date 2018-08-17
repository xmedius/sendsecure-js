import SendSecure from '../../../src/sendsecure.js';
let chai = require ('chai');
let sinon = require('sinon');
let sinonChai = require ('sinon-chai');
chai.use(sinonChai);
let expect = require('chai').expect;

export default describe('CreateSafeboxes', () => {
  let client = new SendSecure.Client(14254, 'USER|489b3b1f-b411-428e-be5b-2abbace87689', 'empire', 'https://sendsecure.awesome.com','en');
  let safebox = new SendSecure.Helpers.Safebox({
    user_email: 'user@acme.com',
    participants: [
      { email: 'recipient@test.xmedius.com',
        guest_options: {
          contact_methods: [
            { destination_type: 'cell_phone',
              destination: '+15145550000' }
          ]}
      }
    ],
    message: 'lorem ipsum...',
    notification_language: 'en',
    security_profile_id: 11
  });

  describe('.submitSafebox', () => {
    it('.return initialized safebox', () => {
      let response = {
        guid: 'dc6f21e0f02c41123b795e4',
        public_encryption_key: 'RBQISzMk9Kw56nCZ8N7h2J0Zhy9rb9ax',
        upload_url: 'upload_url'
      };

      sinon.stub(client.jsonClient, 'newSafebox').withArgs(safebox.userEmail)
      .resolves(response);
      return client.initializeSafebox(safebox).then(sb => {
        expect(sb).to.be.an.instanceOf(SendSecure.Helpers.Safebox);
        expect(sb.guid).to.equal(response.guid);
        expect(sb.publicEncryptionKey).to.equal(response.public_encryption_key);
        expect(sb.uploadUrl).to.equal(response.upload_url);
      });
    });
  });

  describe('.commitSafebox', () => {
    it('.return updated safebox after commit', () => {
      safebox = new SendSecure.Helpers.Safebox({
        guid: 'dc6f21e0f02c4112874f8b5653b795e4',
        participants: [
          {
            first_name: '',
            last_name: '',
            company_name: '',
            email: 'john.smith@example.com',
            privilegied: 'true',
            contact_methods: [
              {
                destination_type: 'cell_phone',
                destination: '+15145550000'
              },
              {
                destination_type: 'office_phone',
                destination: '+15145551111'
              }
            ]
          }
        ],
        subject: 'Donec rutrum congue leo eget malesuada. ',
        message: 'Donec rutrum congue leo eget malesuada. Proin eget tortor risus. Nulla quis lorem ut libero malesuada feugiat. Nulla porttitor accumsan tincidunt...',
        document_ids: [
          '97334293-23c2-4c94-8cee-369ddfabb678',
          '74268a39-ae88-49bc-9cc9-423d4126bd33'
        ],
        security_options: {
          security_profile_id: 7,
          reply_enabled: true,
          group_replies: true,
          expiration_value: 1,
          expiration_unit: 'months',
          retention_period_type: 'discard_at_expiration',
          retention_period_value: null,
          retention_period_unit: null,
          encrypt_message:  true,
          double_encryption: false
        },
        public_encryption_key: 'RBQISzMk9KwkdBKDVw8sQK0gQe4MOTBGaM7hLdVOmJJ56nCZ8N7h2J0Zhy9rb9ax',
        notification_language: 'en',
        user_email: 'john@example.com'
      });
      let response = { guid: '1c820789a50747df8746aa5d71922a3f',
        user_id: 3,
        enterprise_id: 1,
        subject: null,
        expiration: '2016-12-06T05:38:09.951Z',
        notification_language: 'en',
        status:'in_progress',
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
        preview_url: 'http://sendsecure.lvh.me:3001/s/5b8e88acc9c4456298f9388/preview?k=AyOmyAawJXKb9LuJA',
        encryption_key: 'AyOmyAawJXKepb9LuJAOyiJXvkpEQcdSweS2-It3jaRntO9rRyCaciv7QBt5Dqoz',
        created_at: '2016-12-05T22:38:09.965Z',
        updated_at: '2016-12-05T22:38:09.965Z',
        latest_activity: '2016-12-05T22:38:10.068Z'
      };
      sinon.stub(client.jsonClient, 'commitSafebox').withArgs(new SendSecure.Helpers.Safebox(safebox.toObject()).toJson())
      .resolves(response);
      return client.commitSafebox(new SendSecure.Helpers.Safebox(safebox.toObject())).then(result => {
        expect(result).to.be.an.instanceOf(SendSecure.Helpers.Safebox);
      });
    });
  });

  describe('.uploadAttachment', () => {
    it('return updated attachment', () => {
      let attachment = new SendSecure.Helpers.Attachment({
        filename: 'foo',
        stream: 'another stream',
        contentType: 'application/x-bzip'
      });
      let response = { temporary_document: {
        document_guid: '65f53ec1282c454fa98439dbda134093'
      }};
      let params = {
        fileStream: 'another stream',
        contentType: 'application/x-bzip',
        filename: 'foo'
      };
      safebox.uploadUrl = 'uploadUrl';
      sinon.stub(client.jsonClient, 'uploadFile').withArgs(safebox.uploadUrl, params)
      .resolves(response);
      return client.uploadAttachment(safebox, attachment).then(result => {
        expect(result.guid).to.equal(response.temporary_document.document_guid);
      });
    });
  });

});