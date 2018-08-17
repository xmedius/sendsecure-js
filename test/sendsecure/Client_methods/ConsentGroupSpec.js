import SendSecure from '../../../src/sendsecure.js';
let chai = require ('chai');
let sinon = require('sinon');
let sinonChai = require ('sinon-chai');
chai.use(sinonChai);
let expect = require('chai').expect;

export default describe('ConsentGroup', () => {
  let client = new SendSecure.Client(14254, 'USER|489b3b1f-b411-428e-be5b-2abbace87689', 'empire', 'https://sendsecure.awesome.com','en');

  describe('.getConsentGroupMessages', () => {
    it('return the list of all the localized messages on success', () => {
      let response = { 'consent_message_group':
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
      sinon.stub(client.jsonClient, 'getConsentGroupMessages').withArgs(1)
      .resolves(response);
      return client.getConsentGroupMessages(1).then(result => {
        expect(result).to.be.an.instanceOf(SendSecure.Helpers.ConsentMessageGroup);
        expect(result.id).to.equal(1);
        expect(result.name).to.equal('Default');
        expect(result.createdAt).to.equal('2016-08-29T14:52:26.085Z');
        expect(result.updatedAt).to.equal('2016-08-29T14:52:26.085Z');
        expect(result.consentMessages.length).to.equal(1);
        expect(result.consentMessages[0]).to.be.an.instanceOf(SendSecure.Helpers.ConsentMessage);
        expect(result.consentMessages[0].locale).to.equal('en');
        expect(result.consentMessages[0].value).to.equal('Lorem ipsum');
        expect(result.consentMessages[0].createdAt).to.equal('2016-08-29T14:52:26.085Z');
        expect(result.consentMessages[0].updatedAt).to.equal('2016-08-29T14:52:26.085Z');
      });
    });
  });

});
