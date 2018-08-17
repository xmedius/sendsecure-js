import SendSecure from '../../../src/sendsecure.js';
let chai = require ('chai');
let sinon = require('sinon');
let sinonChai = require ('sinon-chai');
chai.use(sinonChai);
let expect = require('chai').expect;

export default describe('EnterpriseMethods', () => {
  let client = new SendSecure.Client(14254, 'USER|489b3b1f-b411-428e-be5b-2abbace87689', 'empire', 'https://sendsecure.awesome.com','en');
  let userEmail = 'user@acme.com';

  describe('.securityProfiles', () => {
    it('return security profiles', () => {
      let response = { security_profiles: [
        { id: 5,
          name: 'reply',
          description: 'no email',
          created_at: '2016-04-19T16:26:18.277Z',
          updated_at: '2016-09-07T19:33:51.192Z',
          allowed_login_attempts: {
            value: 3,
            modifiable: false
          } },
        { id: 10,
          name: 'email-only',
          description: '',
          created_at: '2016-04-27T21:08:29.457Z',
          updated_at: '2016-07-27T19:03:05.883Z',
          allow_remember_me: {
            value: false,
            modifiable: false
          } }
      ]};

      sinon.stub(client.jsonClient, 'securityProfiles').withArgs(userEmail).resolves(response);
      return client.securityProfiles(userEmail).then(securityProfiles => {
        expect(securityProfiles.length).to.equal(2);
        expect(securityProfiles[0]).to.be.an.instanceOf(SendSecure.Helpers.SecurityProfile);
        expect(securityProfiles[0].allowedLoginAttempts).to.be.an.instanceOf(SendSecure.Helpers.Value);
        expect(securityProfiles[0].allowedLoginAttempts.value).to.equal(3);
        client.jsonClient.securityProfiles.restore();
      });
    });
  });

  describe('.enterpriseSettings', () => {
    it('return enterprise settings', () => {
      let response = { created_at: '2016-03-15T19:58:11.588Z',
        updated_at: '2016-09-28T18:32:16.643Z',
        default_security_profile_id: 10,
        pdf_language: 'fr',
        use_pdfa_audit_records: false,
        international_dialing_plan: 'us',
        extension_filter: {
          mode: 'forbid',
          list: []
        },
        include_users_in_autocomplete: true,
        include_favorites_in_autocomplete: true
      };
      sinon.stub(client.jsonClient, 'enterpriseSettings').resolves(response);
      return client.enterpriseSettings().then(enterpriseSettings => {
        expect(enterpriseSettings).to.be.an.instanceOf(SendSecure.Helpers.EnterpriseSettings);
        expect(enterpriseSettings.extensionFilter).to.be.an.instanceOf(SendSecure.Helpers.ExtensionFilter);
        expect(enterpriseSettings.defaultSecurityProfile).to.equal(response.default_security_profile);
        client.jsonClient.enterpriseSettings.restore();
      });
    });
  });

  describe('.defaultSecurityProfile', () => {
    it('return default_security_profile', () => {
      let enterpriseSettingsResponse = { created_at: '2016-03-15T19:58:11.588Z',
        updated_at: '2016-09-28T18:32:16.643Z',
        default_security_profile_id: 10,
        pdf_language: 'fr',
        use_pdfa_audit_records: false,
        international_dialing_plan: 'us',
        extension_filter: {
          mode: 'forbid',
          list: []
        },
        include_users_in_autocomplete: true,
        include_favorites_in_autocomplete: true
      };
      let securityProfilesResponse = { security_profiles: [
        { id: 5,
          name: 'reply',
          description: 'no email',
          created_at: '2016-04-19T16:26:18.277Z',
          updated_at: '2016-09-07T19:33:51.192Z',
          allowed_login_attempts: {
            value: 3,
            modifiable: false
          } },
        { id: 10,
          name: 'email-only',
          description: '',
          created_at: '2016-04-27T21:08:29.457Z',
          updated_at: '2016-07-27T19:03:05.883Z',
          allow_remember_me: {
            value: false,
            modifiable: false
          } }
      ]};
      sinon.stub(client.jsonClient, 'securityProfiles').withArgs(userEmail).resolves(securityProfilesResponse);
      sinon.stub(client.jsonClient, 'enterpriseSettings').resolves(enterpriseSettingsResponse);
      return client.defaultSecurityProfile(userEmail).then(defaultSecurityProfile => {
        expect(defaultSecurityProfile.id).to.equal(10);
      });
    });
  });
});
