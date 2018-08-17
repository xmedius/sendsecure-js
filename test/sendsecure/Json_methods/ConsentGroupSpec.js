import SendSecure from '../../../src/sendsecure.js';
import * as Utils from '../../../src/modules/Utils/platform.js';
import { stub } from '../TestStub.js';
let chai = require ('chai');
let sinonChai = require ('sinon-chai');
chai.use(sinonChai);
let Response = require('node-fetch').Response;
let expect = require('chai').expect;

export default describe('.ConsentGroup', () => {
  let jsonClient = new SendSecure.JsonClient(42, 'USER|489b3b1f-b411-428e-be5b-2abbace87689', 'empire', 'https://sendsecure.awesome.com','en');
  var fakePromise;
  var stubOnCalls;

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

  describe('.getConsentGroupMessages', () => {
    it('return the list of all the localized messages on success', () => {
      let result = { 'consent_message_group':
      { 'id': 1,
        'name': 'Default',
        'created_at': '2016-08-29T14:52:26.085Z',
        'updated_at': '2016-08-29T14:52:26.085Z',
        'consent_messages': [
          { 'locale': 'en',
            'value': 'Lorem ipsum',
            'created_at': '2016-08-29T14:52:26.085Z',
            'updated_at': '2016-08-29T14:52:26.085Z'
          }]}};
      stubOnCalls(result);
      return jsonClient.getConsentGroupMessages(1).then(res => {
        expect(Utils.fetch).to.have.been.calledWith('https://sendsecure.awesome.com/services/empire/sendsecure/server/url');
        expect(Utils.fetch).to.have.been.calledWith(
          'https://sendsecure.awesome.com/api/v2/enterprises/empire/consent_message_groups/1?locale=en',
          { headers: { 'Authorization-Token':'USER|489b3b1f-b411-428e-be5b-2abbace87689' }, method: 'get' }
        );
        expect(res.consent_message_group.id).to.equal(1);
        expect(res.consent_message_group.name).to.equal('Default');
        expect(res.consent_message_group.created_at).to.equal('2016-08-29T14:52:26.085Z');
        expect(res.consent_message_group.updated_at).to.equal('2016-08-29T14:52:26.085Z');
        expect(res.consent_message_group.consent_messages.length).to.equal(1);
      });
    });
  });

});