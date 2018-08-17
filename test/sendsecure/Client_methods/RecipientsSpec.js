import SendSecure from '../../../src/sendsecure.js';
let chai = require ('chai');
let sinon = require('sinon');
let sinonChai = require ('sinon-chai');
chai.use(sinonChai);
let expect = require('chai').expect;

export default describe('Recipients', () => {
  let client = new SendSecure.Client(14254, 'USER|489b3b1f-b411-428e-be5b-2abbace87689', 'empire', 'https://sendsecure.awesome.com','en');

  describe('.searchRecipient', () => {
    it('raise exception when searching for null or undefined', () => {
      expect(client.searchRecipient.bind(client, null)).to.throw('Search term cannot be null');
    });

    it('return the list of recipients', () => {
      let response = { results: [
        {
          id: 7514,
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
        }]};
      sinon.stub(client.jsonClient, 'searchRecipient').withArgs('John').resolves(response);
      return client.searchRecipient('John').then(result => {
        expect(result).to.deep.equal(response.results);
      });
    });
  });

});