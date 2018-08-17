import SendSecure from '../../../src/sendsecure.js';
import * as Utils from '../../../src/modules/Utils/platform.js';
import { stub } from '../TestStub.js';
let chai = require ('chai');
let sinonChai = require ('sinon-chai');
chai.use(sinonChai);
let Response = require('node-fetch').Response;
let expect = require('chai').expect;

export default describe('SafeboxOperations', () => {
  let jsonClient = new SendSecure.JsonClient(14254, 'USER|489b3b1f-b411-428e-be5b-2abbace87689', 'empire', 'https://sendsecure.awesome.com','en');
  var fakePromise;
  var stubOnCalls;
  let safeboxGuid = '73af62f766ee459e81f46e4f533085a4';

  beforeEach(() => {
    fakePromise = function(promiseHelper){
      return new Promise((resolve, reject) => {
        promiseHelper(resolve,reject);
      });
    };
    stubOnCalls = function(result){
      stub.onFirstCall().returns(fakePromise(r => r(new Response('https://sendsecure.awesome.com/'))));
      stub.onSecondCall().returns(fakePromise(r => r(new Response(JSON.stringify(result)))));
    };
  });

  afterEach(() => {
    stub.reset();
  });

  describe('.createParticipant', () => {
    it('return participant on success', () => {
      let participantJson = { participant: {
        first_name: 'John',
        last_name: 'Smith',
        company_name: 'Acme',
        email: 'john.smith@example.com',
        contact_methods: [
          { destination: '+15145550000',
            destination_type: 'office_phone' }
        ]}};
      let response = { id: '7a3c51e00a004917a8f5db807180fcc5',
        type: 'guest',
        guest_options: {
          company_name: 'Acme',
          contact_methods: [
            { id:1,
              created_at:'2017-04-28T17:14:55.304Z' }
          ]
        }};
      stubOnCalls(response);
      return jsonClient.createParticipant(safeboxGuid, participantJson).then(res => {
        expect(Utils.fetch).to.have.been.calledWith('https://sendsecure.awesome.com/services/empire/sendsecure/server/url');
        expect(Utils.fetch).to.have.been.calledWith(
          'https://sendsecure.awesome.com/api/v2/safeboxes/73af62f766ee459e81f46e4f533085a4/participants',
          { headers: { 'Authorization-Token':'USER|489b3b1f-b411-428e-be5b-2abbace87689', 'Content-Type': 'application/json' },
            method: 'post',
            body: participantJson });
        expect(res.id).to.equal(response.id);
        expect(res.guest_options.contact_methods.length).to.equal(1);
      });
    });
  });

  describe('.updateParticipant', () => {
    it('return participant on success', () => {
      let participantJson = { participant: {
        first_name: 'John',
        last_name: 'Smith',
        company_name: 'Acme',
        locked: true,
        contact_methods: [
          { id: 1,
            destination: '+15145550000',
            destination_type: 'office_phone' }
        ]}};
      let response = { id: '7a3c51e00a004917a8f5db807180fcc5',
        email: 'john.smith@example.com',
        type: 'guest',
        guest_options: {
          company_name: 'Acme',
          contact_methods: [
            { id:1,
              created_at:'2017-04-28T17:14:55.304Z' }
          ]
        }};

      stubOnCalls(response);
      return jsonClient.updateParticipant(safeboxGuid, '7a3c51e00a004917a8f5db807180fcc5', participantJson)
      .then(res => {
        expect(Utils.fetch).to.have.been.calledWith('https://sendsecure.awesome.com/services/empire/sendsecure/server/url');
        expect(Utils.fetch).to.have.been.calledWith(
          'https://sendsecure.awesome.com/api/v2/safeboxes/73af62f766ee459e81f46e4f533085a4/participants/7a3c51e00a004917a8f5db807180fcc5',
          { headers: { 'Authorization-Token':'USER|489b3b1f-b411-428e-be5b-2abbace87689', 'Content-Type': 'application/json'},
            method: 'patch',
            body: participantJson
          });
        expect(res.id).to.equal(response.id);
        expect(res.guest_options.contact_methods.length).to.equal(1);
      });
    });
  });

  describe('.addTime', () => {
    let timeJson = JSON.stringify({ safebox: { add_time_value: 2, add_time_unit: 'weeks' } });
    it('return new expiration on success', () => {
      let result = { result: true,
        message: 'SafeBox duration successfully extended.',
        new_expiration: '2028-08-31T12:38:43.814Z' };
      stubOnCalls(result);
      return jsonClient.addTime(safeboxGuid, timeJson).then(res => {
        expect(Utils.fetch).to.have.been.calledWith('https://sendsecure.awesome.com/services/empire/sendsecure/server/url');
        expect(Utils.fetch).to.have.been.calledWith(
          'https://sendsecure.awesome.com/api/v2/safeboxes/73af62f766ee459e81f46e4f533085a4/add_time?locale=en',
          { headers: { 'Authorization-Token':'USER|489b3b1f-b411-428e-be5b-2abbace87689', 'Content-Type': 'application/json' }, method: 'patch', body: timeJson, }
        );
        expect(res.new_expiration).to.equal('2028-08-31T12:38:43.814Z');
      });
    });
  });

  describe('.closeSafebox', () => {
    it('return result on success', () => {
      let result = { result: true, message: 'SafeBox successfully closed.' };
      stubOnCalls(result);
      return jsonClient.closeSafebox(safeboxGuid).then(res => {
        expect(Utils.fetch).to.have.been.calledWith('https://sendsecure.awesome.com/services/empire/sendsecure/server/url');
        expect(Utils.fetch).to.have.been.calledWith(
          'https://sendsecure.awesome.com/api/v2/safeboxes/73af62f766ee459e81f46e4f533085a4/close?locale=en',
          { headers: { 'Authorization-Token':'USER|489b3b1f-b411-428e-be5b-2abbace87689', 'Content-Type': 'application/json' }, method: 'patch' }
        );
        expect(res.result).to.equal(result.result);
        expect(res.message).to.equal(result.message);
      });
    });
  });

  describe('.deleteSafeboxContent', () => {
    it('return result on success', () => {
      let result = { result: true, message: 'SafeBox content successfully deleted.' };
      stubOnCalls(result);
      return jsonClient.deleteSafeboxContent(safeboxGuid).then(res => {
        expect(Utils.fetch).to.have.been.calledWith('https://sendsecure.awesome.com/services/empire/sendsecure/server/url');
        expect(Utils.fetch).to.have.been.calledWith(
          'https://sendsecure.awesome.com/api/v2/safeboxes/73af62f766ee459e81f46e4f533085a4/delete_content?locale=en',
          { headers: { 'Authorization-Token':'USER|489b3b1f-b411-428e-be5b-2abbace87689', 'Content-Type': 'application/json' }, method: 'patch' }
        );
        expect(res.result).to.equal(result.result);
        expect(res.message).to.equal(result.message);
      });
    });
  });

  describe('.markAsRead', () => {
    it('return result on success', () => {
      let result = { result: true };
      stubOnCalls(result);
      return jsonClient.markAsRead(safeboxGuid).then(res => {
        expect(Utils.fetch).to.have.been.calledWith('https://sendsecure.awesome.com/services/empire/sendsecure/server/url');
        expect(Utils.fetch).to.have.been.calledWith(
          'https://sendsecure.awesome.com/api/v2/safeboxes/73af62f766ee459e81f46e4f533085a4/mark_as_read?locale=en',
          { headers: { 'Authorization-Token':'USER|489b3b1f-b411-428e-be5b-2abbace87689', 'Content-Type': 'application/json' }, method: 'patch' }
        );
        expect(res.result).to.equal(true);
      });
    });
  });

  describe('.markAsUnread', () => {
    it('return result on success', () => {
      let result = { result: true };
      stubOnCalls(result);
      return jsonClient.markAsUnread(safeboxGuid).then(res => {
        expect(Utils.fetch).to.have.been.calledWith('https://sendsecure.awesome.com/services/empire/sendsecure/server/url');
        expect(Utils.fetch).to.have.been.calledWith(
          'https://sendsecure.awesome.com/api/v2/safeboxes/73af62f766ee459e81f46e4f533085a4/mark_as_unread?locale=en',
          { headers: { 'Authorization-Token':'USER|489b3b1f-b411-428e-be5b-2abbace87689', 'Content-Type': 'application/json' }, method: 'patch' }
        );
        expect(res.result).to.equal(true);
      });
    });
  });

  describe('.markAsReadMessage', () => {
    it('return result on success', () => {
      let result = { result: true };
      stubOnCalls(result);
      return jsonClient.markAsReadMessage(safeboxGuid, '145926').then(res => {
        expect(Utils.fetch).to.have.been.calledWith('https://sendsecure.awesome.com/services/empire/sendsecure/server/url');
        expect(Utils.fetch).to.have.been.calledWith(
          'https://sendsecure.awesome.com/api/v2/safeboxes/73af62f766ee459e81f46e4f533085a4/messages/145926/read?locale=en',
          { headers: { 'Authorization-Token':'USER|489b3b1f-b411-428e-be5b-2abbace87689', 'Content-Type': 'application/json' }, method: 'patch' }
        );
        expect(res.result).to.equal(true);
      });
    });
  });

  describe('.markAsUnreadMessage', () => {
    it('return result on success', () => {
      let result = { result: true };
      stubOnCalls(result);
      return jsonClient.markAsUnreadMessage(safeboxGuid, '145926').then(res => {
        expect(Utils.fetch).to.have.been.calledWith('https://sendsecure.awesome.com/services/empire/sendsecure/server/url');
        expect(Utils.fetch).to.have.been.calledWith(
          'https://sendsecure.awesome.com/api/v2/safeboxes/73af62f766ee459e81f46e4f533085a4/messages/145926/unread?locale=en',
          { headers: { 'Authorization-Token':'USER|489b3b1f-b411-428e-be5b-2abbace87689', 'Content-Type': 'application/json' }, method: 'patch' }
        );
        expect(res.result).to.equal(true);
      });
    });
  });

  describe('.getFileUrl', () => {
    it('return file url on success', () => {
      let result = { url: 'https://fileserver.integration.xmedius.com/xmss/DteeDmb-2zfN5WtCbgpJfSENaNjvbHi' };
      stubOnCalls(result);
      return jsonClient.getFileUrl(safeboxGuid, '127fd57er25ew4', 'user@empire.com').then(res => {
        expect(Utils.fetch).to.have.been.calledWith('https://sendsecure.awesome.com/services/empire/sendsecure/server/url');
        expect(Utils.fetch).to.have.been.calledWith(
          'https://sendsecure.awesome.com/api/v2/safeboxes/73af62f766ee459e81f46e4f533085a4/documents/127fd57er25ew4/url?user_email=user@empire.com&locale=en',
          { headers: { 'Authorization-Token':'USER|489b3b1f-b411-428e-be5b-2abbace87689' }, method: 'get' }
        );
        expect(res.url).to.equal(result.url);
      });
    });
  });

  describe('.getAuditRecordPdfUrl', () => {
    it('return audit record pdf url on success', () => {
      let result = { url: 'http://sendsecure.integration.xmedius.com/s/73af62f766ee459e81f46e4f533085a4.pdf' };
      stubOnCalls(result);
      return jsonClient.getAuditRecordPdfUrl(safeboxGuid).then(res => {
        expect(Utils.fetch).to.have.been.calledWith('https://sendsecure.awesome.com/services/empire/sendsecure/server/url');
        expect(Utils.fetch).to.have.been.calledWith(
          'https://sendsecure.awesome.com/api/v2/safeboxes/73af62f766ee459e81f46e4f533085a4/audit_record_pdf?locale=en',
          { headers: { 'Authorization-Token':'USER|489b3b1f-b411-428e-be5b-2abbace87689' }, method: 'get' }
        );
        expect(res.url).to.equal(result.url);
      });
    });
  });

  describe('.reply', () => {
    it('return result on success', () => {
      let replyJson = JSON.stringify({ safebox:
      { message: 'Hello World!',
        consent: true,
        document_ids: ['343c79aa061544a7a122f37dc6e0318e']
      }});
      let result = { result: true, message: 'SafeBox successfully updated.' };
      stubOnCalls(result);
      return jsonClient.reply(safeboxGuid, replyJson).then(res => {
        expect(Utils.fetch).to.have.been.calledWith('https://sendsecure.awesome.com/services/empire/sendsecure/server/url');
        expect(Utils.fetch).to.have.been.calledWith(
          'https://sendsecure.awesome.com/api/v2/safeboxes/73af62f766ee459e81f46e4f533085a4/messages?locale=en',
          { headers: { 'Authorization-Token':'USER|489b3b1f-b411-428e-be5b-2abbace87689', 'Content-Type': 'application/json' },
            method: 'post',
            body: replyJson
          }
        );
        expect(res).to.deep.equal(result);
      });
    });
  });

});
