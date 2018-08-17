import BaseHelper from './BaseHelper.js';
import ExtensionFilter from './ExtensionFilter.js';
import { camelCasify } from '../Utils/helperFunctions.js';

let map = new WeakMap();

export default class EnterpriseSettings extends BaseHelper {
  constructor(object){
    super();
    object = camelCasify(object);
    map.set(this, {
        createdAt: this.property(object, 'createdAt').orNull(),
        updatedAt: this.property(object, 'updatedAt').orNull(),
        defaultSecurityProfileId: this.property(object, 'defaultSecurityProfileId').orNull(),
        pdfLanguage: this.property(object, 'pdfLanguage').orNull(),
        usePdfaAuditRecords: this.property(object, 'usePdfaAuditRecords').orNull(),
        internationalDialingPlan: this.property(object, 'internationalDialingPlan').orNull(),
        extensionFilter: this.property(object, 'extensionFilter').using(v => new ExtensionFilter(object.extensionFilter)).orNull(),
        virusScanEnabled: this.property(object, 'virusScanEnabled').orNull(),
        maxFileSizeValue: this.property(object, 'maxFileSizeValue').orNull(),
        maxFileSizeUnit: this.property(object, 'maxFileSizeUnit').orNull(),
        includeUsersInAutocomplete: this.property(object, 'includeUsersInAutocomplete').orNull(),
        includeFavoritesInAutocomplete: this.property(object, 'includeFavoritesInAutocomplete').orNull(),
        usersPublicUrl: this.property(object, 'usersPublicUrl').orNull()
    });
    Object.seal(this);
  }

  get createdAt() {
    return map.get(this).createdAt;
  }

  get updatedAt() {
    return map.get(this).updatedAt;
  }

  get defaultSecurityProfileId() {
    return map.get(this).defaultSecurityProfileId;
  }

  get pdfLanguage() {
    return map.get(this).pdfLanguage;
  }

  get usePdfaAuditRecords() {
    return map.get(this).usePdfaAuditRecords;
  }

  get internationalDialingPlan() {
    return map.get(this).internationalDialingPlan;
  }

  get extensionFilter() {
    return map.get(this).extensionFilter;
  }

  get virusScanEnabled() {
    return map.get(this).virusScanEnabled;
  }

  get maxFileSizeValue() {
    return map.get(this).maxFileSizeValue;
  }

  get maxFileSizeUnit() {
    return map.get(this).maxFileSizeUnit;
  }

  get includeUsersInAutocomplete() {
    return map.get(this).includeUsersInAutocomplete;
  }

  get includeFavoritesInAutocomplete() {
    return map.get(this).includeFavoritesInAutocomplete;
  }

  get usersPublicUrl() {
    return map.get(this).usersPublicUrl;
  }

}
