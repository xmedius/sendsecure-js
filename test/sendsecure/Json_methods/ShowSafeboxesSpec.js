import SendSecure from '../../../src/sendsecure.js';
import * as Utils from '../../../src/modules/Utils/platform.js';
import { stub } from '../TestStub.js';
let chai = require ('chai');
let sinonChai = require ('sinon-chai');
chai.use(sinonChai);
let Response = require('node-fetch').Response;
let expect = require('chai').expect;

export default describe('ShowSafeboxes', () => {
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

  describe('.getSafeboxList', () => {
    it('return a safebox list when passing search parameters', () => {
      let response = { count: 1,
        previous_page_url: null,
        next_page_url: 'api/v2/safeboxes?status=unread&search=test&page=2',
        safeboxes: [
          {
            guid: '73af62f766ee459e81f46e4f533085a4',
            user_id: 1,
            enterprise_id: 1
          }
        ]
      };

      stubOnCalls(response);
      return jsonClient.getSafeboxList(null, {status: 'unread', search_term: 'test', page: 1}).then(res => {
        expect(Utils.fetch).to.have.been.calledWith('https://sendsecure.awesome.com/services/empire/sendsecure/server/url');
        expect(Utils.fetch).to.have.been.calledWith(
          'https://sendsecure.awesome.com/api/v2/safeboxes?status=unread&search_term=test&page=1&locale=en',
          { headers: { 'Authorization-Token':'USER|489b3b1f-b411-428e-be5b-2abbace87689'}, method: 'get' }
        );
        expect(['count', 'previous_page_url', 'next_page_url'].every(v => res[v] == response[v])).to.be.true;
        expect('safeboxes' in res).to.be.true;
        expect(res.safeboxes.length).to.equal(1);
        expect('guid' in res.safeboxes[0]).to.be.true;
      });
    });

    it('return a safebox list when passing search url', () => {
      let response = { count: 1,
        previous_page_url: null,
        next_page_url: 'api/v2/safeboxes?status=unread&search=test&page=2',
        safeboxes: [
          {
            guid: '73af62f766ee459e81f46e4f533085a4',
            user_id: 1,
            enterprise_id: 1
          }
        ]
      };

      stubOnCalls(response);
      return jsonClient.getSafeboxList('https://sendsecure.awesome.com/api/v2/safeboxes?status=unread&search_term=test&page=1').then(res => {
        expect(Utils.fetch).to.have.been.calledWith('https://sendsecure.awesome.com/services/empire/sendsecure/server/url');
        expect(Utils.fetch).to.have.been.calledWith(
          'https://sendsecure.awesome.com/api/v2/safeboxes?status=unread&search_term=test&page=1&locale=en',
          { headers: { 'Authorization-Token':'USER|489b3b1f-b411-428e-be5b-2abbace87689'}, method: 'get' }
        );
        expect(['count', 'previous_page_url', 'next_page_url'].every(v => res[v] == response[v])).to.be.true;
        expect('safeboxes' in res).to.be.true;
        expect(res.safeboxes.length).to.equal(1);
        expect('guid' in res.safeboxes[0]).to.be.true;
      });
    });
  });

  describe('.getSafeboxInfo', () => {
    it('return result on success without specifying sections', () => {
      let response = { safebox: {
        guid: '73af62f766ee459e81f46e4f533085a4',
        security_options: {},
        participants: [],
        messages: [],
        download_activity: {},
        event_history: []
      }};

      stubOnCalls(response);
      return jsonClient.getSafeboxInfo(safeboxGuid).then(result => {
        expect(Utils.fetch).to.have.been.calledWith('https://sendsecure.awesome.com/services/empire/sendsecure/server/url');
        expect(Utils.fetch).to.have.been.calledWith(
          'https://sendsecure.awesome.com/api/v2/safeboxes/73af62f766ee459e81f46e4f533085a4?locale=en',
          { headers: { 'Authorization-Token':'USER|489b3b1f-b411-428e-be5b-2abbace87689'}, method: 'get' }
        );
        expect([
          'guid',
          'security_options',
          'participants',
          'messages',
          'download_activity',
          'event_history'].every(v => v in result.safebox)).to.be.true;
      });
    });

    it ('return result on success when sections are specified', () => {
      let response = { safebox: {
        guid: '73af62f766ee459e81f46e4f533085a4',
        security_options: {},
        participants: [],
        messages: [{
          id: 149341,
          note: 'random...',
          noteSize: null,
          read: true,
          authorId: 386817,
          authorType: 'User',
          createdAt: '2018-06-21T12:54:00.784Z',
          documents: []
        }],
        download_activity: {},
        event_history: []
      }};
      stubOnCalls(response);
      return jsonClient.getSafeboxInfo(safeboxGuid, 'messages').then(result => {
        expect(Utils.fetch).to.have.been.calledWith('https://sendsecure.awesome.com/services/empire/sendsecure/server/url');
        expect(Utils.fetch).to.have.been.calledWith(
          'https://sendsecure.awesome.com/api/v2/safeboxes/73af62f766ee459e81f46e4f533085a4?sections=messages&locale=en',
          { headers: { 'Authorization-Token':'USER|489b3b1f-b411-428e-be5b-2abbace87689'}, method: 'get' }
        );
        expect(result.safebox.messages).to.not.be.empty;
      });
    });
  });

  describe('.getSafeboxParticipants', () => {
    it('return result on success', () => {
      let response = { participants: [
        { id: '7a3c51e00a004917a8f5db807180fcc5',
          guest_options: {}
        },
        { id: '1',
          role: 'owner'
        }
      ]};

      stubOnCalls(response);
      return jsonClient.getSafeboxParticipants(safeboxGuid).then(res => {
        expect(Utils.fetch).to.have.been.calledWith('https://sendsecure.awesome.com/services/empire/sendsecure/server/url');
        expect(Utils.fetch).to.have.been.calledWith(
          'https://sendsecure.awesome.com/api/v2/safeboxes/73af62f766ee459e81f46e4f533085a4/participants?locale=en',
          { headers: { 'Authorization-Token':'USER|489b3b1f-b411-428e-be5b-2abbace87689'}, method: 'get' }
        );
        expect(res.participants.length).to.equal(2);
        expect(res.participants[0].id).to.equal('7a3c51e00a004917a8f5db807180fcc5');
        expect( 'guest_options' in res.participants[0]).to.be.true;
        expect(res.participants[1].id).to.equal('1');
        expect(res.participants[1].role).to.equal('owner');
        expect( 'guest_options' in res.participants[1]).to.be.false;
      });
    });
  });

  describe('.getSafeboxMessages', () => {
    it('return result on success', () => {
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

      stubOnCalls(response);
      return jsonClient.getSafeboxMessages(safeboxGuid).then(res => {
        expect(Utils.fetch).to.have.been.calledWith('https://sendsecure.awesome.com/services/empire/sendsecure/server/url');
        expect(Utils.fetch).to.have.been.calledWith(
          'https://sendsecure.awesome.com/api/v2/safeboxes/73af62f766ee459e81f46e4f533085a4/messages?locale=en',
          { headers: { 'Authorization-Token':'USER|489b3b1f-b411-428e-be5b-2abbace87689'}, method: 'get' }
        );
        expect(res.messages.length).to.equal(1);
        expect(res.messages[0].documents.length).to.equal(1);
        expect(res.messages).to.deep.equal(response.messages);
      });
    });
  });

  describe('.getSafeboxSecurityOptions', () => {
    it('return result on success', () => {
      let response = { security_options:
      { security_code_length: 4,
        allowed_login_attempts: 3,
        allow_remember_me: true
      }};

      stubOnCalls(response);
      return jsonClient.getSafeboxSecurityOptions(safeboxGuid).then(res => {
        expect(Utils.fetch).to.have.been.calledWith('https://sendsecure.awesome.com/services/empire/sendsecure/server/url');
        expect(Utils.fetch).to.have.been.calledWith(
          'https://sendsecure.awesome.com/api/v2/safeboxes/73af62f766ee459e81f46e4f533085a4/security_options?locale=en',
          { headers: { 'Authorization-Token':'USER|489b3b1f-b411-428e-be5b-2abbace87689'}, method: 'get' }
        );
        expect(res.security_options.security_code_length).to.deep.equal(4);
        expect(res.security_options.allowed_login_attempts).to.deep.equal(3);
        expect(res.security_options.allow_remember_me).to.deep.equal(true);
      });
    });
  });

  describe('.getSafeboxDownloadActivity', () => {
    it('return result on success', () => {
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

      stubOnCalls(response);
      return jsonClient.getSafeboxDownloadActivity(safeboxGuid).then(res => {
        expect(Utils.fetch).to.have.been.calledWith('https://sendsecure.awesome.com/services/empire/sendsecure/server/url');
        expect(Utils.fetch).to.have.been.calledWith(
          'https://sendsecure.awesome.com/api/v2/safeboxes/73af62f766ee459e81f46e4f533085a4/download_activity?locale=en',
          { headers: { 'Authorization-Token':'USER|489b3b1f-b411-428e-be5b-2abbace87689'}, method: 'get' }
        );
        expect(res.download_activity.guests.length).to.equal(2);
        expect(res.download_activity).to.deep.equal(response.download_activity);
      });
    });
  });

  describe('.getSafeboxEventHistory', () => {
    it('.return result on success', () => {
      let response = { event_history: [
        { type: '42220c777c30486e80cd3bbfa7f8e82f',
          date: [],
          metadata: {},
          message: 'SafeBox created by john.smith@example.com with 0 attachment(s) from 0.0.0.0 for john.smith@example.com'
        }
      ]};

      stubOnCalls(response);
      return jsonClient.getSafeboxEventHistory(safeboxGuid).then(res => {
        expect(Utils.fetch).to.have.been.calledWith('https://sendsecure.awesome.com/services/empire/sendsecure/server/url');
        expect(Utils.fetch).to.have.been.calledWith(
          'https://sendsecure.awesome.com/api/v2/safeboxes/73af62f766ee459e81f46e4f533085a4/event_history?locale=en',
          { headers: { 'Authorization-Token':'USER|489b3b1f-b411-428e-be5b-2abbace87689'}, method: 'get' }
        );
        expect(res.event_history.length).to.equal(1);
        expect(res.event_history).to.deep.equal(response.event_history);
      });
    });
  });

});
