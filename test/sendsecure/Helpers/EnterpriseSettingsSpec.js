import SendSecure from '../../../src/sendsecure.js';
let expect = require('chai').expect;

export default describe('EnterpriseSettings', () => {

  let settings = new SendSecure.Helpers.EnterpriseSettings({
    created_at: '2016-04-27T21:08:29.457Z',
    updated_at: '2016-07-27T19:03:05.883Z',
    default_security_profile_id: 1,
    pdf_language: 'en',
    use_pdfa_audit_records: false,
    international_dialing_plan: 'ca',
    extension_filter: {
      mode: 'forbid',
      list: ['bin', 'bat']
    },
    virus_scan_enabled: false,
    max_file_size_value: null,
    max_file_size_unit: null,
    include_users_in_autocomplete: true,
    include_favorites_in_autocomplete: true,
    users_public_url: true
  });

  it('basic attributes', () => {
    expect(settings.createdAt).to.equal('2016-04-27T21:08:29.457Z');
    expect(settings.updatedAt).to.equal('2016-07-27T19:03:05.883Z');
    expect(settings.defaultSecurityProfileId).to.equal(1);
    expect(settings.pdfLanguage).to.equal('en');
    expect(settings.usePdfaAuditRecords).to.equal(false);
    expect(settings.internationalDialingPlan).to.equal('ca');
    expect(settings.virusScanEnabled).to.equal(false);
    expect(settings.maxFileSizeValue).to.be.null;
    expect(settings.maxFileSizeUnit).to.be.null;
    expect(settings.includeUsersInAutocomplete).to.equal(true);
    expect(settings.includeFavoritesInAutocomplete).to.equal(true);
    expect(settings.usersPublicUrl).to.equal(true);
  });

  it('extension filter attributes', () => {
    let extensionFilter = settings.extensionFilter;
    expect(extensionFilter).to.be.an.instanceof(SendSecure.Helpers.ExtensionFilter);
    expect(extensionFilter.mode).to.equal('forbid');
    expect(extensionFilter.list).to.deep.equal(['bin', 'bat']);
  });

});