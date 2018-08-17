import SendSecure from '../../../src/sendsecure.js';
let expect = require('chai').expect;

export default describe('Participant', () => {
  let participant = new SendSecure.Helpers.Participant ({
    id: '7a3c51e00a004917a8f5db807180fcc5',
    first_name: 'John',
    last_name: 'Smith',
    email: 'john.smith@example.com',
    type: 'guest',
    role: 'guest',
    message_read_count: 0,
    message_total_count: 1,
    guest_options: {
      company_name: 'Acme',
      locked: false,
      bounced_email: false,
      failed_login_attempts: 0,
      verified: false,
      contact_methods: [{
        id: 1,
        destination: '+15145550000',
        destination_type: 'office_phone',
        verified: false,
        created_at: '2017-04-28T17:14:55.304Z',
        updated_at: '2017-04-28T17:14:55.304Z' },
      { id: 2,
        destination: '+15145550001',
        destination_type: 'cell_phone',
        verified: true,
        created_at: '2017-04-28T18:14:55.304Z',
        updated_at: '2017-04-28T18:14:55.304Z' }]
    }
  });

  it('basic attributes', () => {
    expect(participant.id).to.equal('7a3c51e00a004917a8f5db807180fcc5');
    expect(participant.firstName).to.equal('John');
    expect(participant.lastName).to.equal('Smith');
    expect(participant.email).to.equal('john.smith@example.com');
    expect(participant.type).to.equal('guest');
    expect(participant.role).to.equal('guest');
    expect(participant.messageReadCount).to.equal(0);
    expect(participant.messageTotalCount).to.equal(1);
  });

  it('contact methods attributes', () => {
    let guestOptions = participant.guestOptions;
    expect(guestOptions.contactMethods.length).to.equal(2);

    let contact = guestOptions.contactMethods[0];
    expect(contact).to.be.an.instanceof(SendSecure.Helpers.ContactMethod);
    expect(contact.id).to.equal(1);
    expect(contact.destinationType).to.equal('office_phone');
    expect(contact.destination).to.equal('+15145550000');
    expect(contact.verified).to.equal(false);
    expect(contact.createdAt).to.equal('2017-04-28T17:14:55.304Z');
    expect(contact.updatedAt).to.equal('2017-04-28T17:14:55.304Z');

    contact = guestOptions.contactMethods[1];
    expect(contact).to.be.an.instanceof(SendSecure.Helpers.ContactMethod);
    expect(contact.id).to.equal(2);
    expect(contact.destinationType).to.equal('cell_phone');
    expect(contact.destination).to.equal('+15145550001');
    expect(contact.verified).to.equal(true);
    expect(contact.createdAt).to.equal('2017-04-28T18:14:55.304Z');
    expect(contact.updatedAt).to.equal('2017-04-28T18:14:55.304Z');
  });

  describe('serialize participant', () => {
    it('on creation', () => {
      let participantJson = JSON.stringify({ participant: {
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
      expect(participant.updateFor(SendSecure.Helpers.PARAMS.CREATION).toJson()).to.equal(participantJson);
    });

    it('on edit', () => {
      let participantJson = JSON.stringify({ participant: {
        email: 'john.smith@example.com',
        first_name: 'John',
        last_name: 'Smith',
        company_name: 'Acme',
        locked: false,
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
          }],
      }});
      expect(participant.updateFor(SendSecure.Helpers.PARAMS.EDITION).toJson()).to.equal(participantJson);
    });

    it('on delete contacts', () => {
      let participantJson = JSON.stringify({ participant: {
        email: 'john.smith@example.com',
        first_name: 'John',
        last_name: 'Smith',
        company_name: 'Acme',
        locked: false,
        contact_methods: [
          {
            destination_type: 'office_phone',
            destination: '+15145550000',
            id: 1,
            _destroy: '1'
          },
          {
            destination_type: 'cell_phone',
            destination: '+15145550001',
            id: 2
          }],
      }});
      expect(participant.updateFor(SendSecure.Helpers.PARAMS.CONTACT_DESTRUCTION).ofFollowingContacts(1).toJson()).to.equal(participantJson);
    });
  });

});
