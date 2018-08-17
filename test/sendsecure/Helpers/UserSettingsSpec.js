import SendSecure from '../../../src/sendsecure.js';
let expect = require('chai').expect;

export default describe('UserSettings', () => {
  let settings = new SendSecure.Helpers.UserSettings({
    created_at: '2016-08-15T21:56:45.798Z',
    updated_at: '2017-04-10T18:58:59.356Z',
    mask_note: false,
    open_first_transaction: false,
    mark_as_read: true,
    mark_as_read_delay: 5,
    remember_key: true,
    default_filter: 'everything',
    recipient_language: null,
    secure_link: {
      enabled: true,
      url: 'https://sendsecure.integration.xmedius.com/r/612328d944b842c68418375ffdc87b3f',
      security_profile_id: 1 }
  });

  it('basic attributes', () => {
    expect(settings.createdAt).to.equal('2016-08-15T21:56:45.798Z');
    expect(settings.updatedAt).to.equal('2017-04-10T18:58:59.356Z');
    expect(settings.maskNote).to.equal(false);
    expect(settings.openFirstTransaction).to.equal(false);
    expect(settings.markAsRead).to.equal(true);
    expect(settings.markAsReadDelay).to.equal(5);
    expect(settings.rememberKey).to.equal(true);
    expect(settings.defaultFilter).to.equal('everything');
    expect(settings.recipientLanguage).to.be.null;
  });

  it('personal secure link attributes', () => {
    let secureLink = settings.secureLink;
    expect(secureLink).to.be.an.instanceof(SendSecure.Helpers.PersonalSecureLink);
    expect(secureLink.enabled).to.equal(true);
    expect(secureLink.url).to.equal('https://sendsecure.integration.xmedius.com/r/612328d944b842c68418375ffdc87b3f');
    expect(secureLink.securityProfileId).to.equal(1);
  });

});