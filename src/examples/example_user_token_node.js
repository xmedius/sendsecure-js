var SendSecure = require ('../../build/sendsecure.cjs.min.js')
SendSecure.Client.getUserToken('acme', '<username>', '<password>', 'deviceid', 'deviceName', 'theApplicationType', 'https://portal.integration.xmedius.com')
  .then(userToken => console.log(userToken))
  .catch(error => { console.error(error); })
