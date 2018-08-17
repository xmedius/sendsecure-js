import SendSecure from '../../../src/sendsecure.js';
let expect = require('chai').expect;

export default describe('Favorite', () => {
  let favorite = new SendSecure.Helpers.Favorite({
    email: 'john.smith@example.com',
    id: 1,
    first_name: 'John',
    last_name: 'Smith',
    company_name: 'Acme',
    order_number: 1,
    created_at: '2017-04-12T15:41:39.767Z',
    updated_at: '2017-04-12T15:41:47.144Z',
    contact_methods: [
      {
        id: 1,
        destination: '+15145550000',
        destination_type: 'office_phone',
        created_at: '2017-04-28T17:14:55.304Z',
        updated_at: '2017-04-28T17:14:55.304Z'
      },
      {
        id: 2,
        destination: '+15145550001',
        destination_type: 'cell_phone',
        created_at: '2017-04-28T18:14:55.304Z',
        updated_at: '2017-04-28T18:14:55.304Z'
      }]
  });

  describe('create favorite with', () => {
    it('all the basic attributes', () => {
      expect(favorite.email).to.equal('john.smith@example.com');
      expect(favorite.id).to.equal(1);
      expect(favorite.firstName).to.equal('John');
      expect(favorite.lastName).to.equal('Smith');
      expect(favorite.companyName).to.equal('Acme');
      expect(favorite.orderNumber).to.equal(1);
      expect(favorite.createdAt).to.equal('2017-04-12T15:41:39.767Z');
      expect(favorite.updatedAt).to.equal('2017-04-12T15:41:47.144Z');
    });

    it('contact methods attributes', () => {
      expect(favorite.contactMethods.length).to.equal(2);
      let contact = favorite.contactMethods[0];
      expect(contact).to.be.an.instanceOf(SendSecure.Helpers.ContactMethod);
      expect(contact.id).to.equal(1);
      expect(contact.destinationType).to.equal('office_phone');
      expect(contact.destination).to.equal('+15145550000');
      expect(contact.createdAt).to.equal('2017-04-28T17:14:55.304Z');
      expect(contact.updatedAt).to.equal('2017-04-28T17:14:55.304Z');

      contact = favorite.contactMethods[1];
      expect(contact).to.be.an.instanceOf(SendSecure.Helpers.ContactMethod);
      expect(contact.id).to.equal(2);
      expect(contact.destinationType).to.equal('cell_phone');
      expect(contact.destination).to.equal('+15145550001');
      expect(contact.createdAt).to.equal('2017-04-28T18:14:55.304Z');
      expect(contact.updatedAt).to.equal('2017-04-28T18:14:55.304Z');
    });
  });

  describe('serialize favorite', () => {
    it('on creation', () => {
      let favoriteJson = JSON.stringify({ favorite: {
        email: 'john.smith@example.com',
        first_name: 'John',
        last_name: 'Smith',
        company_name: 'Acme',
        contact_methods: [
          {
            destination_type: 'office_phone',
            destination: '+15145550000'
          },
          {
            destination_type: 'cell_phone',
            destination: '+15145550001'
          }]
      }});
      expect(favorite.updateFor(SendSecure.Helpers.PARAMS.CREATION).toJson()).to.equal(favoriteJson);
    });

    it('on edit', () => {
      let favoriteJson = JSON.stringify({ favorite: {
        email: 'john.smith@example.com',
        first_name: 'John',
        last_name: 'Smith',
        company_name: 'Acme',
        order_number: 1,
        contact_methods: [
          {
            destination_type: 'office_phone',
            destination: '+15145550000',
            id: 1
          },
          {
            destination_type: 'cell_phone',
            destination: '+15145550001',
            id: 2
          }]
      }});
      expect(favorite.updateFor(SendSecure.Helpers.PARAMS.EDITION).toJson()).to.equal(favoriteJson);
    });

    it('on delete contacts', () => {
      let favoriteJson = JSON.stringify({ favorite: {
        email: 'john.smith@example.com',
        first_name: 'John',
        last_name: 'Smith',
        company_name: 'Acme',
        order_number: 1,
        contact_methods: [
          {
            destination_type: 'office_phone',
            destination: '+15145550000',
            id: 1,
            _destroy: true
          },
          {
            destination_type: 'cell_phone',
            destination: '+15145550001',
            id: 2
          }]
      }});
      expect(favorite.updateFor(SendSecure.Helpers.PARAMS.CONTACT_DESTRUCTION).ofFollowingContacts(1).toJson()).to.equal(favoriteJson);
    });
  });
});
