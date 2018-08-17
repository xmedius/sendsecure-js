import SendSecure from '../../../src/sendsecure.js';
import * as Utils from '../../../src/modules/Utils/platform.js';
import { stub } from '../TestStub.js';
let chai = require ('chai');
let sinonChai = require ('sinon-chai');
chai.use(sinonChai);
let Response = require('node-fetch').Response;
let expect = require('chai').expect;

export default describe('Recipients', () => {
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

  describe('.searchRecipient', () => {
    it('return list of recipients on success', () => {
      let response = { results: [
        { id: 7514,
          type: 'favorite',
          first_name: 'John',
          last_name: 'Smith',
          email: 'john.smith@example.com',
          company_name: 'Acme'
        },
        { id: 150848,
          type: 'user',
          first_name: 'johnny',
          last_name: 'smith',
          email: 'john124@example.com',
          company_name: 'acme'
        }
      ]};

      stubOnCalls(response);
      return jsonClient.searchRecipient('john').then(res => {
        expect(Utils.fetch).to.have.been.calledWith('https://sendsecure.awesome.com/services/empire/sendsecure/server/url');
        expect(Utils.fetch).to.have.been.calledWith(
          'https://sendsecure.awesome.com/api/v2/participants/autocomplete?term=john',
          { headers: { 'Authorization-Token':'USER|489b3b1f-b411-428e-be5b-2abbace87689'},
            method: 'get'
          });
        expect(res.results.length).to.equal(2);
      });
    });
  });

});
