var SendSecure = require ('../build/sendsecure.cjs.min.js')
SendSecure.Client.getUserToken("enterpriseAccount", "username", "password", "deviceId", "deviceName", "SendSecure Js", "endpoint")
  .then(console.log)
  .catch(console.error);
