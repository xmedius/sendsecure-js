import SendSecure from '../../../src/sendsecure.js';
let chai = require ('chai');
let sinon = require('sinon');
let sinonChai = require ('sinon-chai');
chai.use(sinonChai);
let expect = require('chai').expect;

export default describe('UserMethods', () => {
  let client = new SendSecure.Client(14254, 'USER|489b3b1f-b411-428e-be5b-2abbace87689', 'empire', 'https://sendsecure.awesome.com','en');
  let favorite = new SendSecure.Helpers.Favorite({
    email: 'john.smith@example.com',
    id: 456,
    last_name: 'Smith',
    company_name: 'Acme',
    order_number: 10,
    contact_methods: [
      { id: 1,
        destination: '+15145550000',
        destination_type: 'office_phone' }
    ]
  });

  describe('.userSettings', () => {
    it('return user settings on success', () => {
      let response = {
        created_at: '2016-03-15T19:58:11.588Z',
        updated_at: '2016-09-28T18:32:16.643Z',
        mask_note: false,
        open_first_transaction: true,
        mark_as_read: true,
        mark_as_read_delay: 2,
        remember_key: true,
        default_filter: 'unread',
        recipient_language: null,
        secure_link: {
          enabled: true,
          url: 'https://sendsecure.integration.xmedius.com/r/612328d944b842c68418375ffdc87b3f',
          security_profile_id: 13
        }
      };

      sinon.stub(client.jsonClient, 'userSettings').withArgs(17254).resolves(response);
      return client.userSettings(17254).then(result => {
        expect(result).to.be.an.instanceOf(SendSecure.Helpers.UserSettings);
        expect(result.secureLink).to.be.an.instanceof(SendSecure.Helpers.PersonalSecureLink);
        expect(result.defaultFilter).to.equal('unread');
      });
    });
  });

  describe('.favorites', () => {
    it('return a list of favorites', () => {
      let response = { favorites: [
        { email: 'john.smith@example.com',
          id: 456,
          first_name: '',
          last_name: 'Smith',
          company_name: 'Acme',
          order_number: 10,
          created_at: '2016-04-19T16:26:18.277Z',
          updated_at: '2016-09-07T19:33:51.192Z',
          contact_methods: [
            { id: 1,
              destination: '+15145550000',
              destination_type: 'office_phone',
              created_at: '2017-04-28T17:14:55.304Z',
              updated_at: '2017-04-28T17:14:55.304Z' }
          ]},
        { email: 'jane.doe@example.com',
          id: 789,
          first_name: 'Jane',
          last_name: '',
          company_name: 'Acme',
          order_number: 20,
          created_at: '2016-05-19T16:26:18.277Z',
          updated_at: '2016-10-07T19:33:51.192Z',
          contact_methods: [] }
      ]};
      sinon.stub(client.jsonClient, 'favorites').resolves(response);
      return client.favorites().then(result => {
        expect(result.length).to.equal(2);
        expect(result[0].id).to.equal(456);
        expect(result[0].contactMethods.length).to.equal(1);
        expect(result[1].id).to.equal(789);
        expect(result[1].contactMethods).to.be.empty;
      });
    });
  });

  describe('createFavorite', () => {
    let favorite = new SendSecure.Helpers.Favorite({
      email: 'john.smith@example.com',
      first_name: '',
      last_name: 'Smith',
      company_name: 'Acme',
      contact_methods: [
        { destination: '+15145550000',
          destination_type: 'office_phone' }
      ]
    });

    it('raise error if favorite email is missing', () => {
      favorite.email = null;
      expect(client.createFavorite.bind(client, favorite)).to.throw('Favorite email cannot be null');
    });

    it('return created favorite on success', () => {
      favorite.email = 'john.smith@example.com';
      let response = { email: 'john.smith@example.com',
        id: 456,
        first_name: '',
        last_name: 'Smith',
        company_name: 'Acme',
        order_number: 10,
        created_at: '2016-04-19T16:26:18.277Z',
        updated_at: '2016-09-07T19:33:51.192Z',
        contact_methods: [
          { id: 1,
            destination: '+15145550000',
            destination_type: 'office_phone',
            created_at: '2017-04-28T17:14:55.304Z',
            updated_at: '2017-04-28T17:14:55.304Z'
          }]
      };
      sinon.stub(client.jsonClient, 'createFavorite').withArgs(favorite.updateFor(SendSecure.Helpers.PARAMS.CREATION).toJson()).resolves(response);
      return client.createFavorite(favorite).then(result => {
        expect(result).to.be.an.instanceOf(SendSecure.Helpers.Favorite);
        expect(result.contactMethods.length).to.equal(1);
        expect(result.contactMethods[0]).to.be.an.instanceOf(SendSecure.Helpers.ContactMethod);
        expect(result.id).to.equal(456);
      });
    });

  });

  describe('.editFavorite', () => {
    it('raise error if favorite id is missing', () => {
      expect(client.editFavorite.bind(client, new SendSecure.Helpers.Favorite())).to.throw('Favorite id cannot be null');
    });

    it('return the updated favorite', () => {
      let response = {
        email: 'john.smith@example.com',
        id: 456,
        first_name: '',
        last_name: 'Smith',
        company_name: 'Acme',
        order_number: 10,
        created_at: '2016-04-19T16:26:18.277Z',
        updated_at: '2016-09-07T19:33:51.192Z',
        contact_methods: [
          { id: 1,
            destination: '+15145550000',
            destination_type: 'office_phone',
            created_at: '2017-04-28T17:14:55.304Z',
            updated_at: '2017-04-28T17:14:55.304Z' }
        ]
      };
      sinon.stub(client.jsonClient, 'editFavorite').withArgs(favorite.id, favorite.updateFor(SendSecure.Helpers.PARAMS.EDITION).toJson()).resolves(response);
      return client.editFavorite(favorite).then(result => {
        expect(result).to.be.an.instanceOf(SendSecure.Helpers.Favorite);
        expect(result.contactMethods.length).to.equal(1);
        expect(result.contactMethods[0]).to.be.an.instanceOf(SendSecure.Helpers.ContactMethod);
        expect(result.id).to.equal(456);
        client.jsonClient.editFavorite.restore();
      });
    });
  });

  describe('.deleteFavoriteContactMethods', () => {
    it('raise error if favorite id is missing', () => {
      expect(client.deleteFavoriteContactMethods.bind(client, new SendSecure.Helpers.Favorite())).to.throw('Favorite id cannot be null');
    });

    it('return the updated favorite', () => {
      let response = {
        email: 'john.smith@example.com',
        id: 456,
        first_name: '',
        last_name: 'Smith',
        company_name: 'Acme',
        order_number: 10,
        created_at: '2016-04-19T16:26:18.277Z',
        updated_at: '2016-09-07T19:33:51.192Z',
        contact_methods: []
      };
      sinon.stub(client.jsonClient, 'editFavorite').withArgs(favorite.id, favorite.updateFor(SendSecure.Helpers.PARAMS.CONTACT_DESTRUCTION).ofFollowingContacts(1).toJson())
      .resolves(response);
      return client.deleteFavoriteContactMethods(favorite, [1]).then(result => {
        expect(result.contactMethods).to.be.empty;
      });
    });
  });

  describe('.deleteFavorite', () => {
    it('return nothing on success', () => {
      sinon.stub(client.jsonClient, 'deleteFavorite').withArgs(456).resolves();
      return client.deleteFavorite(favorite).then(result => {
        expect(result).to.be.empty;
      });
    });
  });
});
