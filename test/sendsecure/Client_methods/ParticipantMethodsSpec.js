import SendSecure from '../../../src/sendsecure.js';
let chai = require ('chai');
let sinon = require('sinon');
let sinonChai = require ('sinon-chai');
chai.use(sinonChai);
let expect = require('chai').expect;

export default describe('ParticipantMethods', () => {
  let client = new SendSecure.Client(14254, 'USER|489b3b1f-b411-428e-be5b-2abbace87689', 'empire', 'https://sendsecure.awesome.com','en');
  let safebox = new SendSecure.Helpers.Safebox({
    guid: '1c820789a50747df8746aa5d71922a3f',
    user_email: 'user@acme.com',
    participants: [
      { id: '7a3c51e00a004917a8f5db807180fcc5',
        email: 'recipient@test.xmedius.com',
        guest_options: {
          contact_methods: [
            {
              destination_type: 'cell_phone',
              destination: '+15145550000' }
          ]
        }
      }
    ]
  });

  describe('.createParticipant', () => {
    let participant = new SendSecure.Helpers.Participant({
      first_name: 'John',
      last_name: 'Smith',
      email: 'john.smith@example.com',
      guest_options: {
        company_name: 'Acme',
        contact_methods: [
          { destination: '+15145550000',
            destination_type: 'office_phone'},
          { destination: '+15145550001',
            destination_type: 'cell_phone' }
        ]
      }
    });
    let response = {
      id: '7a3c51e00a004917a8f5db807180fcc5',
      first_name: 'John',
      last_name: 'Smith',
      email: 'john.smith@example.com',
      type: 'guest',
      role: 'guest',
      guest_options: {
        company_name: 'Acme',
        locked: false,
        bounced_email: false,
        failed_login_attempts: 0,
        verified: false,
        contact_methods: [
          { id: 1,
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
            updated_at: '2017-04-28T18:14:55.304Z' }
        ]}};
    it('raises an exception when safebox guid is missing', () => {
      expect(client.createParticipant.bind(client, new SendSecure.Helpers.Safebox(), participant)).to.throw('SafeBox GUID cannot be null');
    });

    it('raises an exception when participant email is missing', () => {
      expect(client.createParticipant.bind(client, safebox, new SendSecure.Helpers.Participant())).to.throw('Participant email cannot be null');
    });

    it('return the updated participant', () => {
      sinon.stub(client.jsonClient, 'createParticipant').withArgs(safebox.guid, participant.updateFor(SendSecure.Helpers.PARAMS.CREATION).toJson())
      .resolves(response);
      return client.createParticipant(safebox, participant).then(result => {
        expect(result).to.be.an.instanceOf(SendSecure.Helpers.Participant);
        expect(result.id).to.equal(response.id);
        expect(safebox.participants).to.deep.include(result);
      });
    });
  });

  describe('.updateParticipant', () => {
    let participant = safebox.participants[0];

    it('raises an exception when safebox guid is missing', () => {
      expect(client.updateParticipant.bind(client, new SendSecure.Helpers.Safebox(), participant)).to.throw('SafeBox GUID cannot be null');
    });

    it('raises an exception when participant id is missing', () => {
      expect(client.updateParticipant.bind(client, safebox, new SendSecure.Helpers.Participant())).to.throw('Participant id cannot be null');
    });

    it('return the updated participant', () => {
      participant.firstName = 'John';
      participant.lastName = 'Smith';
      participant.guestOptions.locked = true;
      let response = {
        id: '7a3c51e00a004917a8f5db807180fcc5',
        first_name: 'John',
        last_name: 'Smith',
        email: 'recipient@test.xmedius.com',
        type: 'guest',
        role: 'guest',
        guest_options: {
          company_name: '',
          locked: true,
          bounced_email: false,
          failed_login_attempts: 0,
          verified: false,
          contact_methods: [
            { id: 1,
              destination: '+15145550000',
              destination_type: 'cell_phone',
              verified: false,
              created_at: '2017-04-28T17:14:55.304Z',
              updated_at: '2017-04-28T17:14:55.304Z' }
          ]}
      };
      sinon.stub(client.jsonClient, 'updateParticipant')
      .withArgs(safebox.guid, participant.id, participant.updateFor(SendSecure.Helpers.PARAMS.EDITION).toJson())
      .resolves(response);
      return client.updateParticipant(safebox, participant).then(result => {
        expect(result).to.be.an.instanceOf(SendSecure.Helpers.Participant);
        expect(result.firstName).to.equal('John');
        expect(result.lastName).to.equal('Smith');
        expect(result.guestOptions.locked).to.be.true;
        client.jsonClient.updateParticipant.restore();
      });
    });
  });

  describe('.deleteParticipantContactMethods', () => {
    let participant = new SendSecure.Helpers.Participant({
      id: '7a3c51e00a004917a8f5db807180fcc5',
      first_name: 'John',
      last_name: 'Smith',
      email: 'recipient@test.xmedius.com',
      type: 'guest',
      role: 'guest',
      guest_options: {
        company_name: '',
        locked: true,
        bounced_email: false,
        failed_login_attempts: 0,
        verified: false,
        contact_methods: [
          { id: 1,
            destination: '+15145550000',
            destination_type: 'cell_phone',
            verified: false,
            created_at: '2017-04-28T17:14:55.304Z',
            updated_at: '2017-04-28T17:14:55.304Z' }
        ]}
    });

    it('raises an exception when safebox guid is missing', () => {
      expect(client.deleteParticipantContactMethods.bind(client, new SendSecure.Helpers.Safebox(), participant, [1])).to.throw('SafeBox GUID cannot be null');
    });

    it('raises an exception when participant id is missing', () => {
      expect(client.deleteParticipantContactMethods.bind(client, safebox, new SendSecure.Helpers.Participant(), [1])).to.throw('Participant id cannot be null');
    });

    it('return the updated participant', () => {
      let response = {
        id: '7a3c51e00a004917a8f5db807180fcc5',
        first_name: 'John',
        last_name: 'Smith',
        email: 'recipient@test.xmedius.com',
        type: 'guest',
        role: 'guest',
        guest_options: {
          company_name: '',
          locked: true,
          bounced_email: false,
          failed_login_attempts: 0,
          verified: false,
          contact_methods: []
        }
      };
      sinon.stub(client.jsonClient, 'updateParticipant')
      .withArgs(safebox.guid, participant.id, participant.updateFor(SendSecure.Helpers.PARAMS.CONTACT_DESTRUCTION).ofFollowingContacts(1).toJson())
      .resolves(response);
      return client.deleteParticipantContactMethods(safebox, participant, [1]).then(result => {
        expect(result).to.be.an.instanceOf(SendSecure.Helpers.Participant);
        expect(result.guestOptions.contactMethods).to.be.empty;
      });
    });
  });

});
