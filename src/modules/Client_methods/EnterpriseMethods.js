import Helpers from '../Helpers/Helpers.js';
import _find from 'lodash/find';

/**
* Retrieves the default security profile of the enterprise
* account for a specific user. A default security profile must have been set in the enterprise account, otherwise
* the method will return nothing.
*
* @param userEmail
*            The email address of a SendSecure user of the current enterprise account
* @return Default security profile of the enterprise, with all its setting values/properties.
*/
export function defaultSecurityProfile(userEmail) {
  return this.securityProfiles(userEmail)
    .then(securityProfiles =>
      this.enterpriseSettings(userEmail)
        .then(enterpriseSettings => {
          return _find(securityProfiles, profile => profile.id == enterpriseSettings.defaultSecurityProfileId );
        })
    )
    .catch (error => { throw error; });
}

/**
* Retrieves all available security profiles of the enterprise account for a specific user.
*
* @param userEmail
*            The email address of a SendSecure user of the current enterprise account
* @return The list of all security profiles of the enterprise account, with all their setting values/properties.
*/
export function securityProfiles(userEmail) {
  return this.jsonClient.securityProfiles(userEmail)
  .then(result => {
    return result.security_profiles.map((e) => new Helpers.SecurityProfile(e));
  });
}

/**
* Retrieves all the current enterprise account's settings specific to SendSecure Account
*
*/
export function enterpriseSettings() {
  return this.jsonClient.enterpriseSettings()
  .then(result => new Helpers.EnterpriseSettings(result));
}
