import { fetch, fs, lookup, isNode, path, FormData } from './Utils/platform.js'
import _any from 'lodash/some.js'
import _all from 'lodash/every.js'
import * as Exception from './sendSecureException.js'

export default class JsonClient {
  constructor(apiToken, enterpriseAccount, endpoint = 'https://portal.xmedius.com', locale = 'en') {
    this.apiToken = apiToken;
    this.endpoint = endpoint;
    this.locale = locale;
    this.enterpriseAccount = enterpriseAccount;
  }

  _getSendSecureEndpoint(enterpriseAccount, endpoint){
    const url  = `${endpoint}/services/${enterpriseAccount}/sendsecure/server/url`
    return fetch(url, {
    	method: 'get'
    }).then((response) => {
      if(response.ok) {
        let text = response.text()
        if (text === ''){
          throw new Exception.UnexpectedServerResponseException(1, 'unexpected server response format');
        }
        return text;
      } else {
        throw new Exception.SendSecureException(response.status, response.statusText);
      }
    })
  }

  _makeRequest( suffixUrl,
                request = { headers: {  'Authorization-Token': this.apiToken }, method: 'get' }) {
    return this._getSendSecureEndpoint(this.enterpriseAccount, this.endpoint)
      .then((sendsecureEndpoint) => {
        const url = `${sendsecureEndpoint}${suffixUrl}`
        // let request = new Request(url , {
        //   headers: headers
        // })
        return fetch(url, request)
        .then((response) => {
            if (response.ok){
              return response.json();
            }
            else {
              throw new Exception.SendSecureException(response.status, response.statusText);
            }
          })
    });
  }

  newSafebox(userEmail){
    const suffix = `api/v2/safeboxes/new?user_email=${userEmail}&locale=${this.locale}`;
    return this._makeRequest(suffix)
  }

  securityProfiles(userEmail) {
    const suffix = `api/v2/enterprises/${this.enterpriseAccount}/security_profiles?user_email=${userEmail}&locale=${this.locale}`;
    return this._makeRequest(suffix)
  }

  enterpriseSettings(userEmail) {
    const suffix = `api/v2/enterprises/${this.enterpriseAccount}/settings?locale=${this.locale}`;
    return this._makeRequest(suffix)
  }

  uploadFile(uploadUrl, object){
    if (!_any(['file', 'filePath', 'fileStream'], (elt) => elt in object)){
      throw new Exception.SendSecureException('0', "upload File arguments error");
    } else {
      if (isNode) {
        if ('filePath' in object) {
          if (fs.existsSync(object.filePath)){
            console.log('A')
            var data = fs.readFileSync(object.filePath);
            var contentType = object.contentType || lookup(object.filePath);
            var filename = object.filename || path.basename(object.filePath);
            return this._uploadFileNode(uploadUrl, data, contentType, filename);
          } else {
            throw new Exception.SendSecureException('0', `${object.filePath} does not exist`);
          }
        } else {
          if (_all(['fileStream', 'contentType', 'filename'], (elt) => elt in object)){
            return this._uploadFileNode(uploadUrl, object.fileStream, object.contentType, object.filename);
          }
        }
      } else {
        if ('file' in object && object.file instanceof File){
          return this._uploadFileBrowser(uploadUrl, object.file);
        } else {
          throw new Exception.SendSecureException('0', '"file" argument should be an instance of File');
        }
      }
    }
  }

  _uploadFileBrowser(uploadUrl, file) {
    var data = new FormData();
    data.append( 'file', file, file.name  );

    return fetch(uploadUrl, {
      method: 'post',
      body: data,
    }).then (response => {
      if (response.ok){
        return response.json()
      }  else {
        throw new Exception.SendSecureException(response.status, response.statusText);
      }
    })
  }

  _uploadFileNode(uploadUrl, fileStream, contentType, filename){
    var data = new FormData();
    data.append( 'file', fileStream, filename  );

    return fetch(uploadUrl, {
    	method: 'post',
    	body: data ,
    }).then (response => {
      if (response.ok){
        return response.json()
      }  else {
        throw new Exception.SendSecureException(response.status, response.statusText);
      }
    })
  }

  commitSafebox(safeboxJson){
    const suffix = `api/v2/safeboxes?locale=${this.locale}`;
    return this._makeRequest(
      suffix,
      {
        headers: {'Authorization-Token': this.apiToken, 'Content-Type': 'application/json'},
        method: 'post',
        body: safeboxJson,
      }
    )
  }

}
