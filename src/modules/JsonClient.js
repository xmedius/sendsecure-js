import * as Utils from './Utils/platform.js';
import * as Exception from './sendSecureException.js';
import * as CreateSafeboxes from './Json_methods/CreateSafeboxes.js';
import * as UserMethods from './Json_methods/UserMethods.js';
import * as EnterpriseMethods from './Json_methods/EnterpriseMethods.js';
import * as SafeboxOperations from './Json_methods/SafeboxOperations.js';
import * as ShowSafeboxes from './Json_methods/ShowSafeboxes.js';
import * as Recipients from './Json_methods/Recipients.js';
import * as ConsentGroup from './Json_methods/ConsentGroup.js';

export default class JsonClient {

  constructor(userId, apiToken, enterpriseAccount, endpoint = 'https://portal.xmedius.com', locale = 'en', noCaching = false) {
    this.apiToken = apiToken;
    this.userId = userId;
    this.endpoint = endpoint;
    this.locale = locale;
    this.enterpriseAccount = enterpriseAccount;
    this.noCaching = noCaching;
    this.newSafebox = CreateSafeboxes.newSafebox;
    this.commitSafebox = CreateSafeboxes.commitSafebox;
    this.uploadFile = CreateSafeboxes.uploadFile;
    this.newFile = CreateSafeboxes.newFile;
    this.userSettings = UserMethods.userSettings;
    this.favorites = UserMethods.favorites;
    this.createFavorite = UserMethods.createFavorite;
    this.editFavorite = UserMethods.editFavorite;
    this.deleteFavorite = UserMethods.deleteFavorite;
    this.getConsentGroupMessages = ConsentGroup.getConsentGroupMessages;
    this.securityProfiles = EnterpriseMethods.securityProfiles;
    this.enterpriseSettings = EnterpriseMethods.enterpriseSettings;
    this.addTime = SafeboxOperations.addTime;
    this.closeSafebox = SafeboxOperations.closeSafebox;
    this.deleteSafeboxContent = SafeboxOperations.deleteSafeboxContent;
    this.markAsRead = SafeboxOperations.markAsRead;
    this.markAsUnread = SafeboxOperations.markAsUnread;
    this.markAsReadMessage = SafeboxOperations.markAsReadMessage;
    this.markAsUnreadMessage = SafeboxOperations.markAsUnreadMessage;
    this.getFileUrl = SafeboxOperations.getFileUrl;
    this.getAuditRecordPdf = SafeboxOperations.getAuditRecordPdf;
    this.getAuditRecordPdfUrl = SafeboxOperations.getAuditRecordPdfUrl;
    this.createParticipant = SafeboxOperations.createParticipant;
    this.updateParticipant = SafeboxOperations.updateParticipant;
    this.reply = SafeboxOperations.reply;
    this.getSafeboxMessages = ShowSafeboxes.getSafeboxMessages;
    this.getSafeboxParticipants = ShowSafeboxes.getSafeboxParticipants;
    this.getSafeboxSecurityOptions = ShowSafeboxes.getSafeboxSecurityOptions;
    this.getSafeboxDownloadActivity = ShowSafeboxes.getSafeboxDownloadActivity;
    this.getSafeboxEventHistory = ShowSafeboxes.getSafeboxEventHistory;
    this.getSafeboxList = ShowSafeboxes.getSafeboxList;
    this.getSafeboxInfo = ShowSafeboxes.getSafeboxInfo;
    this.searchRecipient = Recipients.searchRecipient;
  }

  _getSendSecureEndpoint(enterpriseAccount, endpoint) {
    const url  = `${endpoint}/services/${enterpriseAccount}/sendsecure/server/url`;
    return Utils.fetch(url, {
      method: 'get'
    }).then((response) => {
      if(response.ok) {
        let text = response.text();
        if (text === '') {
          throw new Exception.UnexpectedServerResponseException(1, 'unexpected server response format');
        }
        return text;
      }
      else {
        throw new Exception.SendSecureException(response.status, response.statusText);
      }
    });
  }

  _makeRequest( suffixUrl,
                request = { headers: {  'Authorization-Token': this.apiToken }, method: 'get' }) {
    return this._getSendSecureEndpoint(this.enterpriseAccount, this.endpoint)
      .then((sendsecureEndpoint) => {
        var url = `${sendsecureEndpoint}${suffixUrl}`;
        if(this.noCaching) {
          url += (suffixUrl.indexOf('?') >= 0 ? '&rand=' : '?rand=') + new Date().getTime();
        }
        return Utils.fetch(url, request);
      })
      .then(response => {
        //Handle responses with no content
        if(response.status === 204) {
          return {};
        }
        if(response.ok) {
          return response.json();
        }
        else {
          return response.text().then(result => {
            throw new Exception.SendSecureException(response.status, response.statusText, result);
          });
        }
      });
  }

  _uploadFileBrowser(uploadUrl, file) {
    var data = new Utils.formData();
    data.append( 'file', file, file.name  );

    return Utils.fetch(uploadUrl, {
      method: 'post',
      body: data,
    }).then (response => {
      if (response.ok){
        return response.json();
      }
      else {
        throw new Exception.SendSecureException(response.status, response.statusText);
      }
    });
  }

  _uploadFileNode(uploadUrl, fileStream, contentType, filename) {
    var data = new Utils.formData();
    data.append( 'file', fileStream, filename  );

    return Utils.fetch(uploadUrl, {
      method: 'post',
      body: data ,
    }).then (response => {
      if(response.ok) {
        return response.json();
      }
      else {
        throw new Exception.SendSecureException(response.status, response.statusText);
      }
    });
  }

}
