import SendSecure from '../../../src/sendsecure.js';
import * as Utils from '../../../src/modules/Utils/platform.js';
import { stub } from '../TestStub.js';
let chai = require ('chai');
let sinonChai = require ('sinon-chai');
chai.use(sinonChai);
let Response = require('node-fetch').Response;
let expect = require('chai').expect;

export default describe('.CreateSafeboxes', () => {
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

  describe('.newSafebox', () => {
    it('return new safebox on success', () => {
      let result =
        { guid: 'e0b4103bccea4dbc8230e112a298f015',
          public_encryption_key: 'M84FbhpsaoaxnsmKlAhmVIkxtS0pGu4_Dye4rKFNDQ2r',
          upload_url: 'https://fileserver1a.integration.xmedius.com/xmss/J-8iuvZ4LwWIhLTvqNx6rUI6M1mqqGxGN'
        };
      stubOnCalls(result);
      return jsonClient.newSafebox('darth.vader@empire.com').then(res => {
        expect(Utils.fetch).to.have.been.calledWith('https://sendsecure.awesome.com/services/empire/sendsecure/server/url');
        expect(Utils.fetch).to.have.been.calledWith(
          'https://sendsecure.awesome.com/api/v2/safeboxes/new?user_email=darth.vader@empire.com&locale=en',
          { headers: { 'Authorization-Token':'USER|489b3b1f-b411-428e-be5b-2abbace87689' }, method: 'get' }
        );
        expect(res.guid).to.equal(result.guid);
        expect(res.public_encryption_key).to.equal(result.public_encryption_key);
        expect(res.upload_url).to.equal(result.upload_url);
      });
    });
  });

  describe('.commitSafebox', () => {
    let safebox = { safebox:
    { guid: '1c820789a50747df8746aa5d71922a3f',
      recipients: [
        { email: 'recipient@test.xmedius.com',
          contact_methods: [
            { destination_type: 'cell_phone',
              destination: '+15145550000' }
          ]
        }
      ],
      message: 'lorem ipsum...',
      security_profile_id: 10,
      public_encryption_key: 'AyOmyAawJXKepb9LuJAOyiJXvkpEQcdSweS2-It3jaRntO9rRyCaciv7QBt5Dqoz',
      notification_language: 'en'
    }};

    it('return safebox info on success', () => {
      let response = { guid: '1c820789a50747df8746aa5d71922a3f', user_id: 3, enterprise_id: 1 };
      stubOnCalls(response);
      return jsonClient.commitSafebox(JSON.stringify(safebox)).then( res => {
        expect(res.guid).to.equal(response.guid);
      });
    });
  });


  describe('.newFile', () => {
    it('return file guid and upload url on success', () => {
      var file = { temporary_document: { document_file_size: 10485 }, multipart: false };
      let result =
        { temporary_document_guid: 'e0b4103bccea4dbc8230e112a298f015',
          upload_url: 'https://fileserver1a.integration.xmedius.com/xmss/J-8iuvZ4LwWrUI6M1mqqGxGN'
        };
      stubOnCalls(result);
      return jsonClient.newFile('ccea4dbc8230e112a298dsa54sa2ads5',JSON.stringify(file)).then( res => {
        expect(res.temporary_document_guid).to.equal(result.temporary_document_guid);
        expect(res.upload_url).to.equal(result.upload_url);
      });
    });
  });

});