import SendSecure from '../../../src/sendsecure.js';
import * as Utils from '../../../src/modules/Utils/platform.js';
import { stub } from '../TestStub.js';
let chai = require ('chai');
let sinonChai = require ('sinon-chai');
chai.use(sinonChai);
let Response = require('node-fetch').Response;
let expect = require('chai').expect;

export default describe('.UserMethods', () => {
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

  describe('.userSettings', () => {
    it('return user settings on success', () => {
      let result = { created_at: '2016-03-15T19:58:11.588Z', updated_at: '2016-09-28T18:32:16.643Z', default_filter: 'unread'};
      stubOnCalls(result);
      return jsonClient.userSettings(42).then(res => {
        expect(Utils.fetch).to.have.been.calledWith('https://sendsecure.awesome.com/services/empire/sendsecure/server/url');
        expect(Utils.fetch).to.have.been.calledWith(
          'https://sendsecure.awesome.com/api/v2/enterprises/empire/users/42/settings?locale=en',
          { headers: { 'Authorization-Token':'USER|489b3b1f-b411-428e-be5b-2abbace87689' }, method: 'get' }
        );
        expect(res.created_at).to.equal(result.created_at);
        expect(res.updated_at).to.equal(result.updated_at);
        expect(res.default_filter).to.equal(result.default_filter);
      });
    });
  });

  describe('.favorites', () => {
    it('return user favorites on success', () => {
      let result = { favorites: [{ email: 'john.smith@example.com', id: 456 }, { email: 'jane.doe@example.com', id: 789 }]};
      stubOnCalls(result);
      return jsonClient.favorites().then(res => {
        expect(Utils.fetch).to.have.been.calledWith('https://sendsecure.awesome.com/services/empire/sendsecure/server/url');
        expect(Utils.fetch).to.have.been.calledWith(
          'https://sendsecure.awesome.com/api/v2/enterprises/empire/users/42/favorites?locale=en',
          { headers: { 'Authorization-Token':'USER|489b3b1f-b411-428e-be5b-2abbace87689' }, method: 'get' }
        );
        expect(res.favorites.length).to.equal(2);
      });
    });
  });

  describe('.createFavorite', () => {
    it('return created favorite on success', () => {
      let favorite = { favorite: {
        first_name: 'John',
        last_name: 'Smith',
        email: 'john.smith@example.com',
        company_name: 'Acme',
        contact_methods:[
          { destination: '+15145550000',
            destination_type: 'office_phone' },
          { destination: '+15145550001',
            destination_type: 'cell_phone' }
        ]
      }};
      let result = { id: 12,
        created_at: '2017-04-28T17:18:30.850Z',
        contact_methods: [
          { id: 1,
            created_at: '2017-04-28T17:14:55.304Z' },
          { id: 2,
            created_at: '2017-04-28T18:14:55.304Z' }
        ]};
      stubOnCalls(result);
      return jsonClient.createFavorite(JSON.stringify(favorite)).then(res => {
        expect(Utils.fetch).to.have.been.calledWith('https://sendsecure.awesome.com/services/empire/sendsecure/server/url');
        expect(Utils.fetch).to.have.been.calledWith(
          'https://sendsecure.awesome.com/api/v2/enterprises/empire/users/42/favorites?locale=en',
          { headers: { 'Authorization-Token':'USER|489b3b1f-b411-428e-be5b-2abbace87689', 'Content-Type': 'application/json' }, method: 'post', body: JSON.stringify(favorite)}
        );
        expect(res.id).to.equal(result.id);
      });
    });
  });

  describe('.editFavorite', () => {
    it('return edited favorite on success', () => {
      let favorite = { favorite: {
        first_name: 'John',
        last_name: 'Smith',
        email: 'john.smith@example.com',
        company_name: 'XMedius',
        contact_methods:[
          { id: 1,
            destination: '+15145550000',
            destination_type: 'office_phone' },
          { id: 2,
            destination: '+15145550001',
            destination_type: 'cell_phone' }
        ]
      }};
      let result = { id: 12,
        created_at: '2017-04-28T17:18:30.850Z',
        contact_methods: [
          { id: 1,
            created_at: '2017-04-28T17:14:55.304Z' },
          { id: 2,
            created_at: '2017-04-28T18:14:55.304Z' }
        ]};
      stubOnCalls(result);
      return jsonClient.editFavorite(12, JSON.stringify(favorite)).then(res => {
        expect(Utils.fetch).to.have.been.calledWith('https://sendsecure.awesome.com/services/empire/sendsecure/server/url');
        expect(Utils.fetch).to.have.been.calledWith(
          'https://sendsecure.awesome.com/api/v2/enterprises/empire/users/42/favorites/12?locale=en',
          { headers: { 'Authorization-Token':'USER|489b3b1f-b411-428e-be5b-2abbace87689', 'Content-Type': 'application/json' }, method: 'patch', body: JSON.stringify(favorite)}
        );
        expect(res.id).to.equal(result.id);
        expect(res.company_name).to.equal(result.company_name);
      });
    });
  });

  describe('.deleteFavorite', () => {
    it('return nothing on success', () => {
      stubOnCalls('');
      return jsonClient.deleteFavorite(12).then(res => {
        expect(Utils.fetch).to.have.been.calledWith('https://sendsecure.awesome.com/services/empire/sendsecure/server/url');
        expect(Utils.fetch).to.have.been.calledWith(
          'https://sendsecure.awesome.com/api/v2/enterprises/empire/users/42/favorites/12?locale=en',
          { headers: { 'Authorization-Token':'USER|489b3b1f-b411-428e-be5b-2abbace87689' }, method: 'delete' }
        );
        expect(res).to.be.empty;
      });
    });
  });
});