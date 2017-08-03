import _find from 'lodash/find';
import _map from 'lodash/map';
import JsonClient from './JsonClient.js';
import Helpers from './Helpers/Helpers.js';
import * as Utils from './Utils/platform.js';
import * as Exception from './sendSecureException.js';

export default class Client {
  constructor(apiToken, enterpriseAccount, endpoint = 'https://portal.xmedius.com', locale = 'en', noCaching = false){
    this.apiToken = apiToken;
    this.enterpriseAccount = enterpriseAccount;
    this.endpoint = endpoint;
    this.locale = locale;
    this.jsonClient = new JsonClient(apiToken, enterpriseAccount, endpoint, locale, noCaching);
  }

  /**
	 * Gets an API Token for a specific user within a SendSecure enterprise account.
	 *
	 * @param enterpriseAccount
	 *            The SendSecure enterprise account
	 * @param username
	 *            The username of a SendSecure user of the current enterprise account
	 * @param password
	 *            The password of this user
	 * @param deviceId
	 *            The device Id that identify that token
	 * @param deviceName
	 *            The device Name that identify that token
	 * @param applicationType
	 *            The application type that identify that token ("SendSecure Java" will be used by default if empty)
	 * @param endpoint
	 *            The URL to the SendSecure service ("https://portal.xmedius.com" will be used by default if empty)
   * @param oneTimePassword
   *            The one-time password of this user (if any)
	 * @return A Promise that is resolved with the API Token to be used for the specified user
   *         or that is rejected  with an instance of SendSecureException
	 */
  static getUserToken(enterpriseAccount, username, password, deviceId, deviceName, applicationType = 'SendSecure Js', endpoint = 'https://portal.xmedius.com', oneTimePassword){
    const url  = `${endpoint}/services/${enterpriseAccount}/portal/host`;
    return Utils.fetch(url, {	method: 'get' })
    .then(response => {
      if(response.ok) {
        let text = response.text();
        if (text === ''){
          throw new Exception.UnexpectedServerResponseException(1, 'unexpected server response format');
        }
        return text;
      } else {
        throw new Exception.SendSecureException(response.status, response.statusText);
      }
    })
    .then(portal_url => {
      const url  = `${portal_url}api/user_token`;
      var data = new Utils.formData();
      data.append( 'permalink', enterpriseAccount  );
      data.append( 'username', username );
      data.append( 'password', password );
      if (oneTimePassword) {
        data.append( 'otp', oneTimePassword );
      }
      data.append( 'application_type', applicationType  );
      data.append( 'device_id', deviceId  );
      data.append( 'device_name', deviceName  );

      return Utils.fetch(url, {	method: 'POST',	body: data });
    })
    .then(response => {
      let json = response.json();
      if (!json){
        throw new Exception.SendSecureException(response.status, response.statusText);
      }
      return json;
    })
    .then( json => {
      if (json.result){
        return json.token;
      } else {
        throw  new Exception.SendSecureException(json.code, json.message);
      }
    })
    .catch( err => {
      if (err instanceof Exception.SendSecureException) {
        throw err;
      }
      throw  new Exception.SendSecureException(err.code, err.message);
    });
  }

  submitSafebox(safebox){
    return this.initializeSafebox(safebox)
      .then(sbx => {
        let requests = _map(sbx.attachments, (item) => {
          return this.uploadAttachment(sbx, item);
        });
        return Promise.all(requests).then(attachments => {
          sbx.attachments = attachments;
          return sbx;
        });
      })
      .then(sbx => {
        if (!sbx.securityProfile){
          return this.defaultSecurityProfile(sbx.userEmail)
            .then( defaultSecurityProfile => {
              sbx.securityProfile = defaultSecurityProfile;
              return this.commitSafebox(sbx);
            });
        }
        else {
          return this.commitSafebox(sbx);
        }
      })
      .catch (error => { throw error; });
  }

  initializeSafebox(safebox){
    return this.jsonClient.newSafebox(safebox.userEmail)
      .then(result => {
        safebox.guid = result.guid;
        safebox.publicEncryptionKey = result.public_encryption_key;
        safebox.uploadUrl = result.upload_url;
        return safebox;
      })
      .catch( error => { throw error; });
  }

  defaultSecurityProfile(userEmail){
    return this.securityProfiles(userEmail)
      .then( securityProfiles =>
        this.enterpriseSettings(userEmail)
          .then(enterpriseSettings => {
            return _find(securityProfiles, profile =>   profile.id == enterpriseSettings.defaultSecurityProfileId );
          })
      )
      .catch ( error => { throw error; });
  }

  uploadAttachment(safebox, attachment){
    var param = Utils.isNode ?
      {
        fileStream: attachment.stream,
        contentType: attachment.contentType,
        filename: attachment.filename
      } : {
        file: attachment.file
      }
    return this.jsonClient.uploadFile(safebox.uploadUrl, param )
      .then(result => {
        attachment.guid = result.temporary_document.document_guid;
        return attachment;
      });
  }

  commitSafebox(safebox){
    return this.jsonClient.commitSafebox(safebox.toJson())
      .then(result => new Helpers.SafeboxResponse(result))
      .catch (error => {throw error;});
  }

  securityProfiles(userEmail){
    return this.jsonClient.securityProfiles(userEmail)
    .then(result => {
      return result.security_profiles.map((e) => new Helpers.SecurityProfile(e));
    });
  }

  enterpriseSettings(){
    return this.jsonClient.enterpriseSettings()
    .then(result => new Helpers.EnterpriseSettings(result));
  }

}
