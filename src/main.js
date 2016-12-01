import { get_user_token } from './modules/getUserToken.js';
import SendSecure from './modules/SendSecure.js'


var inputElement = document.getElementById("input");
inputElement.addEventListener("change", function(){
  var file = this.files[0]; /* now you can work with the file list */

  get_user_token('acme', 'bonjour', 'Qwerty123', 'https://portal.integration.xmedius.com')
    .then(result => {
      new SendSecure.JsonClient( result,
                                 'acme',
                                 'https://portal.integration.xmedius.com'
                               ).newSafebox('mail@mail.com')
        .then(result => {
            new SendSecure.JsonClient( 'USER|09ca5098-997b-4d3b-a105-4ae7fd66e216',
                                       'acme',
                                       'https://portal.integration.xmedius.com'
                                     ).uploadFile(result.upload_url, file)
            .then(response => console.log(response))
            .catch(function(err) { console.log(err); })

        })
     })
    .catch(function(err) { console.log(err); })
});

get_user_token('acme', 'bonjour', 'Qwerty123', 'https://portal.integration.xmedius.com')
  .then(result => {
    new SendSecure.JsonClient( result,
                               'acme',
                               'https://portal.integration.xmedius.com'
                             ).getSecurityProfiles('mail@mail.com')
      .then(result => console.log(result))
   })
  .catch(function(err) { console.log(err); })

get_user_token('acme', 'bonjour', 'Qwerty123', 'https://portal.integration.xmedius.com')
  .then(result => {
    new SendSecure.JsonClient( result,
                               'acme',
                               'https://portal.integration.xmedius.com'
                             ).getEnterpriseSettings()
      .then(result => console.log(result))
   })
  .catch(function(err) { console.log(err); })
