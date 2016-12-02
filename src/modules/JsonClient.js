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
                headers = new Headers({  'Authorization-Token': this.apiToken }),
                init = { method: 'get'} ) {
    return this._getSendSecureEndpoint(this.enterpriseAccount, this.endpoint)
      .then((sendsecureEndpoint) => {
        const url = `${sendsecureEndpoint}${suffixUrl}`
        let request = new Request(url , {
          headers: headers
        })
        return fetch(request, init)
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

  getSecurityProfiles(userEmail) {
    const suffix = `api/v2/enterprises/${this.enterpriseAccount}/security_profiles?user_email=${userEmail}&locale=${this.locale}`;
    return this._makeRequest(suffix)
  }

  getEnterpriseSettings(userEmail) {
    const suffix = `api/v2/enterprises/${this.enterpriseAccount}/settings?locale=${this.locale}`;
    return this._makeRequest(suffix)
  }

  uploadFile(uploadUrl, file){
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

  commitSafebox(safeboxJson){
    const suffix = `api/v2/safeboxes?locale=${this.locale}`;
    return this._makeRequest(
      suffix,
      new Headers({
        'Authorization-Token': this.apiToken,
        'Content-Type': 'application/json'
      }),
      {
        method: 'post',
        body: safeboxJson,
      }
    )
  }

}
