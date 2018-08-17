import SendSecure from '../../../src/sendsecure.js';
let chai = require ('chai');
let sinon = require('sinon');
let sinonChai = require ('sinon-chai');
chai.use(sinonChai);
let expect = require('chai').expect;

export default describe('Safeboxes', () => {
  let client = new SendSecure.Client(14254, 'USER|489b3b1f-b411-428e-be5b-2abbace87689', 'empire', 'https://sendsecure.awesome.com','en');
  let searchUrl = 'https://sendsecure.awesome.com/api/v2/safeboxes?status=unread&search_term=test&page=1';

  afterEach(() => {
    client.jsonClient.getSafeboxList.restore();
  });

  describe('.getSafeboxList', () => {
    let response = { count: 2,
      previous_page_url: null,
      next_page_url: 'api/v2/safeboxes?status=unread&search=test&page=2',
      safeboxes: [
        { safebox: {
          guid: '73af62f766ee459e81f46e4f533085a4',
          user_id: 1,
          enterprise_id: 1,
          subject: 'Donec rutrum congue leo eget malesuada. ',
          notification_language: 'de',
          status: 'in_progress',
          security_profile_name: 'All Contact Method Allowed!',
          unread_count: 0,
          double_encryption_status: 'disabled',
          audit_record_pdf: null,
          secure_link: null,
          secure_link_title: null,
          email_notification_enabled: true,
          created_at: '2017-05-24T14:45:35.062Z',
          updated_at: '2017-05-24T14:45:35.589Z',
          assigned_at: '2017-05-24T14:45:35.040Z',
          latest_activity: '2017-05-24T14:45:35.544Z',
          expiration: '2017-05-31T14:45:35.038Z',
          closed_at: null,
          content_deleted_at: null
        }
        },
        { safebox: {
          guid: '73af62f766452111146e4f533085a4',
          user_id: 1,
          enterprise_id: 1,
          subject: 'Donec rutrum congue leo eget malesuada. ',
          notification_language: 'de',
          status: 'in_progress',
          security_profile_name: 'All Contact Method Allowed!',
          unread_count: 0,
          double_encryption_status: 'disabled',
          audit_record_pdf: null,
          secure_link: null,
          secure_link_title: null,
          email_notification_enabled: true,
          created_at: '2017-05-24T14:45:35.062Z',
          updated_at: '2017-05-24T14:45:35.589Z',
          assigned_at: '2017-05-24T14:45:35.040Z',
          latest_activity: '2017-05-24T14:45:35.544Z',
          expiration: '2017-05-31T14:45:35.038Z',
          closed_at: null,
          content_deleted_at: null
        }
        }
      ]
    };

    it('return informations about the found safeboxes', () => {
      sinon.stub(client.jsonClient, 'getSafeboxList').withArgs(searchUrl).resolves(response);
      return client.getSafeboxList(searchUrl).then(result => {
        expect(['count', 'previous_page_url', 'next_page_url'].every(v => result[v] == response[v])).to.be.true;
      });
    });

    it('return the list of safeboxes', () => {
      sinon.stub(client.jsonClient, 'getSafeboxList').withArgs(searchUrl).resolves(response);
      return client.getSafeboxList(searchUrl).then(result => {
        expect(result.safeboxes.length).to.equal(2);
        expect(result.safeboxes[0]).to.be.an.instanceOf(SendSecure.Helpers.Safebox);
      });
    });
  });

  describe('getSafebox', () => {
    let safeboxListResponse = { count: 2,
      previous_page_url: null,
      next_page_url: 'api/v2/safeboxes?status=unread&search=test&page=2',
      safeboxes: [
        { safebox: {
          guid: '73af62f766ee459e81f46e4f533085a4',
          user_id: 1,
          enterprise_id: 1,
          subject: 'Donec rutrum congue leo eget malesuada. ',
          notification_language: 'de',
          status: 'in_progress',
          security_profile_name: 'All Contact Method Allowed!',
          unread_count: 0,
          double_encryption_status: 'disabled',
          audit_record_pdf: null,
          secure_link: null,
          secure_link_title: null,
          email_notification_enabled: true,
          created_at: '2017-05-24T14:45:35.062Z',
          updated_at: '2017-05-24T14:45:35.589Z',
          assigned_at: '2017-05-24T14:45:35.040Z',
          latest_activity: '2017-05-24T14:45:35.544Z',
          expiration: '2017-05-31T14:45:35.038Z',
          closed_at: null,
          content_deleted_at: null
        }
        },
        { safebox: {
          guid: '73af62f766452111146e4f533085a4',
          user_id: 1,
          enterprise_id: 1,
          subject: 'Donec rutrum congue leo eget malesuada. ',
          notification_language: 'de',
          status: 'in_progress',
          security_profile_name: 'All Contact Method Allowed!',
          unread_count: 0,
          double_encryption_status: 'disabled',
          audit_record_pdf: null,
          secure_link: null,
          secure_link_title: null,
          email_notification_enabled: true,
          created_at: '2017-05-24T14:45:35.062Z',
          updated_at: '2017-05-24T14:45:35.589Z',
          assigned_at: '2017-05-24T14:45:35.040Z',
          latest_activity: '2017-05-24T14:45:35.544Z',
          expiration: '2017-05-31T14:45:35.038Z',
          closed_at: null,
          content_deleted_at: null
        }
        }
      ]
    };
    it('return safebox on success', () => {
      sinon.stub(client.jsonClient, 'getSafeboxList').withArgs(null, {}).resolves(safeboxListResponse);
      return client.getSafebox('73af62f766452111146e4f533085a4').then(result => {
        expect(result).to.be.an.instanceOf(SendSecure.Helpers.Safebox);
        expect(result.guid).to.equal('73af62f766452111146e4f533085a4');
      });
    });

    it('raise exception on failure', () => {
      sinon.stub(client.jsonClient, 'getSafeboxList').withArgs(null, {}).resolves(safeboxListResponse);
      return client.getSafebox('73af62f7').catch(error => {
        expect(error.message).to.eq('No matching safebox found');
      });
    });
  });
});