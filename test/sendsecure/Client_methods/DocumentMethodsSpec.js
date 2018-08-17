import SendSecure from '../../../src/sendsecure.js';
let chai = require ('chai');
let sinon = require('sinon');
let sinonChai = require ('sinon-chai');
chai.use(sinonChai);
let expect = require('chai').expect;

export default describe('DocumentMethods', () => {
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
  let document = new SendSecure.Helpers.Attachment({filename: 'foo', stream: 'another stream', contentType: 'application/x-bzip'});

  beforeEach(() => {
    safebox.guid = '1c820789a50747df8746aa5d71922a3f';
    safebox.userEmail = 'user@acme.com';
    document.guid = '12345';
  });

  describe('.getFileUrl', () => {
    it('raises an exception when safebox guid is missing', () => {
      safebox.guid = null;
      expect(client.getFileUrl.bind(client, safebox, document)).to.throw('SafeBox GUID cannot be null');
    });

    it('raises an exception when user email is missing', () => {
      safebox.userEmail = null;
      expect(client.getFileUrl.bind(client, safebox, document)).to.throw('SafeBox user email cannot be null');
    });

    it('raises an exception when document guid is missing', () => {
      document.guid = null;
      expect(client.getFileUrl.bind(client, safebox, document)).to.throw('Document GUID cannot be null');
    });

    it('return the file url', () => {
      let response = { url: 'https://fileserver.integration.xmedius.com/xmss/DteeDmb-2zfN5WtCbgpJfSENaNjvbHi_ntxetJTu' };
      sinon.stub(client.jsonClient, 'getFileUrl').withArgs(safebox.guid, document.guid, safebox.userEmail).resolves(response);
      return client.getFileUrl(safebox, document).then(res => {
        expect(res).to.equal(response.url);
      });
    });
  });
});