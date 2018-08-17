import JsonClient from './JsonClient.js';
import Helpers from './Helpers/Helpers.js';
import * as Utils from './Utils/platform.js';
import * as Exception from './sendSecureException.js';
import * as CreateSafeboxes from './Client_methods/CreateSafeboxes.js';
import * as EnterpriseMethods from './Client_methods/EnterpriseMethods.js';
import * as UserMethods from './Client_methods/UserMethods.js';
import * as SafeboxMethods from './Client_methods/SafeboxMethods.js';
import * as DocumentMethods from './Client_methods/DocumentMethods.js';
import * as Safeboxes from './Client_methods/Safeboxes.js';
import * as ParticipantMethods from './Client_methods/ParticipantMethods.js';
import * as Recipients from './Client_methods/Recipients.js';
import * as ConsentGroup from './Client_methods/ConsentGroup.js';

export default class Client {

  constructor(userId, apiToken, enterpriseAccount, endpoint = 'https://portal.xmedius.com', locale = 'en', noCaching = false){
    this.apiToken = apiToken;
    this.userId = userId;
    this.enterpriseAccount = enterpriseAccount;
    this.endpoint = endpoint;
    this.locale = locale;
    this.jsonClient = new JsonClient(userId, apiToken, enterpriseAccount, endpoint, locale, noCaching);
    this.submitSafebox = CreateSafeboxes.submitSafebox;
    this.initializeSafebox = CreateSafeboxes.initializeSafebox;
    this.commitSafebox = CreateSafeboxes.commitSafebox;
    this.uploadAttachment = CreateSafeboxes.uploadAttachment;
    this.defaultSecurityProfile = EnterpriseMethods.defaultSecurityProfile;
    this.securityProfiles = EnterpriseMethods.securityProfiles;
    this.enterpriseSettings = EnterpriseMethods.enterpriseSettings;
    this.userSettings = UserMethods.userSettings;
    this.favorites = UserMethods.favorites;
    this.createFavorite = UserMethods.createFavorite;
    this.editFavorite = UserMethods.editFavorite;
    this.deleteFavoriteContactMethods = UserMethods.deleteFavoriteContactMethods;
    this.deleteFavorite = UserMethods.deleteFavorite;
    this.getConsentGroupMessages = ConsentGroup.getConsentGroupMessages;
    this.addTime = SafeboxMethods.addTime;
    this.closeSafebox = SafeboxMethods.closeSafebox;
    this.deleteSafeboxContent = SafeboxMethods.deleteSafeboxContent;
    this.markAsRead = SafeboxMethods.markAsRead;
    this.markAsUnread = SafeboxMethods.markAsUnread;
    this.markAsReadMessage = SafeboxMethods.markAsReadMessage;
    this.markAsUnreadMessage = SafeboxMethods.markAsUnreadMessage;
    this.getAuditRecordPdf = SafeboxMethods.getAuditRecordPdf;
    this.getAuditRecordPdfUrl = SafeboxMethods.getAuditRecordPdfUrl;
    this.getSafeboxMessages = SafeboxMethods.getSafeboxMessages;
    this.getSafeboxParticipants = SafeboxMethods.getSafeboxParticipants;
    this.getSafeboxSecurityOptions = SafeboxMethods.getSafeboxSecurityOptions;
    this.getSafeboxDownloadActivity = SafeboxMethods.getSafeboxDownloadActivity;
    this.getSafeboxEventHistory = SafeboxMethods.getSafeboxEventHistory;
    this.getSafeboxInfo = SafeboxMethods.getSafeboxInfo;
    this.reply = SafeboxMethods.reply;
    this.getFileUrl = DocumentMethods.getFileUrl;
    this.getSafeboxList = Safeboxes.getSafeboxList;
    this.getSafebox = Safeboxes.getSafebox;
    this.createParticipant = ParticipantMethods.createParticipant;
    this.updateParticipant = ParticipantMethods.updateParticipant;
    this.deleteParticipantContactMethods = ParticipantMethods.deleteParticipantContactMethods;
    this.searchRecipient = Recipients.searchRecipient;
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
   *            The application type that identify that token ("SendSecure Js" will be used by default if empty)
   * @param endpoint
   *            The URL to the SendSecure service ("https://portal.xmedius.com" will be used by default if empty)
   * @param oneTimePassword
   *            The one-time password of this user (if any)
   * @return A Promise that is resolved with the API Token to be used for the specified user
   *         or that is rejected  with an instance of SendSecureException
   */
  static getUserToken(enterpriseAccount, username, password, deviceId, deviceName, applicationType = 'SendSecure Js', endpoint = 'https://portal.xmedius.com', oneTimePassword) {
    const url  = `${endpoint}/services/${enterpriseAccount}/portal/host`;
    return Utils.fetch(url, {	method: 'get' })
    .then(response => {
      if(response.ok) {
        let text = response.text();
        if(text === '') {
          throw new Exception.UnexpectedServerResponseException(1, 'unexpected server response format');
        }
        return text;
      }
      else {
        throw new Exception.SendSecureException(response.status, response.statusText);
      }
    })
    .then(portal_url => {
      const url  = `${portal_url}api/user_token`;
      var data = new Utils.formData();
      data.append( 'permalink', enterpriseAccount  );
      data.append( 'username', username );
      data.append( 'password', password );
      if(oneTimePassword) {
        data.append( 'otp', oneTimePassword );
      }
      data.append( 'application_type', applicationType  );
      data.append( 'device_id', deviceId  );
      data.append( 'device_name', deviceName  );

      return Utils.fetch(url, {	method: 'POST',	body: data });
    })
    .then(response => {
      let json = response.json();
      if(!json) {
        throw new Exception.SendSecureException(response.status, response.statusText);
      }
      return json;
    })
    .then( json => {
      if(json.result) {
        return json;
      }
      else {
        throw new Exception.SendSecureException(json.code, json.message);
      }
    })
    .catch( err => {
      if(err instanceof Exception.SendSecureException) {
        throw err;
      }
      throw new Exception.SendSecureException(err.code, err.message);
    });
  }

}
