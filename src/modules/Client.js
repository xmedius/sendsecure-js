import _find from 'lodash/find'
import JsonClient from './JsonClient.js'
import Helpers from './Helpers/Helpers.js'
import { get_user_token } from './getUserToken.js';
import * as Exception from './sendSecureException.js'

export default class Client {
  constructor(apiToken, enterpriseAccount, endpoint = "https://portal.xmedius.com", locale = "en"){
    this.apiToken = apiToken;
    this.enterpriseAccount = enterpriseAccount;
    this.endpoint = endpoint;
    this.locale = locale;
    this.jsonClient = new JsonClient(apiToken, enterpriseAccount, endpoint, locale)
  }

  //TODO ramener le get_user_token
  static getUserToken(enterprise_account, username, password, endpoint, one_time_password){
    return get_user_token(enterprise_account, username, password, endpoint, one_time_password);
  }

  submitSafebox(safebox){
    this.initializeSafebox(safebox)
      .then(sbx => {
        console.log(sbx)
        sbx.attachments.forEach(elt => {
          this.uploadAttachment(sbx, new Helpers.Attachment(elt.file))
          .then( attachment =>  {
            sbx.attachments = [attachment];
            if (!sbx.securityProfile){
              this.defaultSecurityProfile(sbx.userEmail)
                .then( defaultSecurityProfile => {
                  sbx.securityProfile = defaultSecurityProfile
                  this.commitSafebox(sbx)
                    .then(e => console.log(e))
                })
            }
            else {
              client.commitSafebox(sbx)
                .then(e => console.log(e))
            }
          })
        })


      })
  }

  initializeSafebox(safebox){
    return this.jsonClient.newSafebox(safebox.userEmail)
      .then(result => {
        safebox.guid = result.guid;
        safebox.publicEncryptionKey = result.public_encryption_key;
        safebox.uploadUrl = result.upload_url;
        return safebox;
      })
      .catch( error => console.log(error)) // TODO : rethrow??
  }

  defaultSecurityProfile(userEmail){
    return this.securityProfiles(userEmail)
      .then( securityProfiles =>
        this.enterpriseSettings(userEmail)
          .then(enterpriseSettings => {
            return _find(securityProfiles, profile =>   profile.id == enterpriseSettings.defaultSecurityProfileId )
          })
      )
  }

  uploadAttachment(safebox, attachment){
    return this.jsonClient.uploadFile(safebox.uploadUrl, attachment.file)
      .then(result => {
        attachment.guid = result.temporary_document.document_guid
        return attachment;
      })
  }

  commitSafebox(safebox){
    return this.jsonClient.commitSafebox(safebox.toJson())
  }

  securityProfiles(userEmail){
    return this.jsonClient.securityProfiles(userEmail)
    .then(result => {
      return result.security_profiles.map((e) => new Helpers.SecurityProfile(e));
    })
  }

  enterpriseSettings(){
    return this.jsonClient.enterpriseSettings()
    .then(result => new Helpers.EnterpriseSettings(result));
  }

}
