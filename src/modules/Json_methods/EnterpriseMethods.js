export function securityProfiles(userEmail) {
  const suffix = `api/v2/enterprises/${this.enterpriseAccount}/security_profiles?user_email=${userEmail}&locale=${this.locale}`;
  return this._makeRequest(suffix);
}

export function enterpriseSettings() {
  const suffix = `api/v2/enterprises/${this.enterpriseAccount}/settings?locale=${this.locale}`;
  return this._makeRequest(suffix);
}