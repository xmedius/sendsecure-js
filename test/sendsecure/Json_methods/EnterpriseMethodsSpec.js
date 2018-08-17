import SendSecure from '../../../src/sendsecure.js';
import * as Utils from '../../../src/modules/Utils/platform.js';
import { stub } from '../TestStub.js';
let chai = require ('chai');
let sinonChai = require ('sinon-chai');
chai.use(sinonChai);
let Response = require('node-fetch').Response;
let expect = require('chai').expect;

export default describe('.EnterpriseMethods', () => {
  let jsonClient = new SendSecure.JsonClient(14254, 'USER|489b3b1f-b411-428e-be5b-2abbace87689', 'empire', 'https://sendsecure.awesome.com','en');
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

  describe('.securityProfiles', () => {
    it('return security profiles on success', () => {
      let result = { security_profiles: [ { id: 5 }, { id: 10 } ]};
      stubOnCalls(result);
      return jsonClient.securityProfiles('darth.vader@empire.com').then(res => {
        expect(Utils.fetch).to.have.been.calledWith('https://sendsecure.awesome.com/services/empire/sendsecure/server/url');
        expect(Utils.fetch).to.have.been.calledWith(
          'https://sendsecure.awesome.com/api/v2/enterprises/empire/security_profiles?user_email=darth.vader@empire.com&locale=en',
          { headers: { 'Authorization-Token':'USER|489b3b1f-b411-428e-be5b-2abbace87689' }, method: 'get' }
        );
        expect(res.security_profiles.length).to.equal(2);
      });
    });

  });

  describe('.enterpriseSettings', () => {
    it('return enterprise settings on success', () => {
      let result = { created_at: '2016-03-15T19:58:11.588Z', updated_at: '2016-09-28T18:32:16.643Z', default_security_profile_id: 10 };
      stubOnCalls(result);
      return jsonClient.enterpriseSettings().then(res => {
        expect(Utils.fetch).to.have.been.calledWith('https://sendsecure.awesome.com/services/empire/sendsecure/server/url');
        expect(Utils.fetch).to.have.been.calledWith(
          'https://sendsecure.awesome.com/api/v2/enterprises/empire/settings?locale=en',
          { headers: { 'Authorization-Token':'USER|489b3b1f-b411-428e-be5b-2abbace87689' }, method: 'get' }
        );
        expect(res.default_security_profile_id).to.equal(result.default_security_profile_id);
        expect(res.created_at).to.equal(result.created_at);
        expect(res.updated_at).to.equal(result.updated_at);
      });
    });

  });
});