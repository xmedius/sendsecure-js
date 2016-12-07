var SendSecure = require ('../../build/sendsecure.cjs.min.js')
SendSecure.Client.getUserToken("deathstar", "darthvader", "d@Rk$1De", "DV-TIE/x1", "TIE Advanced x1", "The Force App")
  .then(function(userToken) { console.log(userToken); })
  .catch(function(error) { console.error(error); })
