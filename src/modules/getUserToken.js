import * as Exception from './sendSecureException.js'

function get_portal_url(enterprise_account, endpoint){
  if (!endpoint) {
    endpoint = 'https://portal.xmedius.com';
  }
  const url  = `${endpoint}/services/${enterprise_account}/portal/host`
  return fetch(url, {
  	method: 'get'
  }).then(function(response) {
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

function post_user_token(portal_url, username, password, enterprise_account, one_time_password){
  const url  = `${portal_url}api/user_token`;

  var data = new FormData();
  data.append( 'permalink', enterprise_account  );
  data.append( 'username', username );
  data.append( 'password', password );
  if (one_time_password) {
    data.append( 'otp', one_time_password );
  }
  data.append( 'application_type', 'SendSecure for JS'  );
  data.append( 'device_id', 'device_id'  );
  data.append( 'device_name', 'something'  );

  return fetch(url, {
  	method: 'POST',
  	body: data,
  })
  .then(function(response){
    let json = response.json();
    if (!json){
      throw new Exception.SendSecureException(response.status, response.statusText);
    }
    return json;
  })
  .then(function(json){
    if (json.result){
      return json.token;
    } else {
      throw  new Exception.SendSecureException(json.code, json.message);
    }
  })
  ;
}

export function get_user_token(enterprise_account, username, password, endpoint, one_time_password){
  return get_portal_url(enterprise_account, endpoint)
   .then((portal_url) => post_user_token(portal_url,username, password, enterprise_account, one_time_password))
   .then((user_token)  => user_token)
   .catch( function(err) { throw err; })
}
