import SendSecure from '../src/sendsecure.js';
import * as Utils from '../src/modules/Utils/platform.js';
let sinon = require('sinon');
let chai = require ('chai');
let sinonChai = require ('sinon-chai');
chai.use(sinonChai);
let Response = require('node-fetch').Response;
let expect = require('chai').expect;

export default describe('.JsonClient', () => {
  var fakePromise;
  beforeEach(() => {
    fakePromise = function(promiseHelper){
      return new Promise((resolve, reject) => {
        promiseHelper(resolve,reject);
      });
    };
  });

  it('.newSafebox', () => {
    var stub = sinon.stub(Utils, 'fetch').withArgs(sinon.match.string, sinon.match.object);
    stub.onFirstCall().returns(fakePromise(r => r(new Response('https://sendsecure.awesome.portal/'))));
    stub.onSecondCall().returns(fakePromise(r => r(new Response(JSON.stringify('this is a new safebox')))));

    let jsonClient = new SendSecure.JsonClient('1234567890ABCDE', 'empire', 'https://an.awesome.portal.com','en');
    return jsonClient.newSafebox('darth.vader@empire.com').then(txt => {
      expect(Utils.fetch).to.have.been.calledTwice;
      expect(Utils.fetch).to.have.been.calledWith('https://an.awesome.portal.com/services/empire/sendsecure/server/url');
      expect(Utils.fetch).to.have.been.calledWith(
        'https://sendsecure.awesome.portal/api/v2/safeboxes/new?user_email=darth.vader@empire.com&locale=en',
        { headers: { 'Authorization-Token': '1234567890ABCDE' }, method: 'get' }
      );
      expect(txt).to.equal('this is a new safebox');
    });
  });
});
