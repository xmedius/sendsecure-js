import { get_user_token } from './modules/getUserToken.js';
import * as JsonClient from './modules/JsonClient.js'


get_user_token('acme', 'bonjour', 'Qwerty123', 'https://portal.integration.xmedius.com')
  .then(result => {
    new JsonClient.JsonClient( result,
                               'acme',
                               'https://portal.integration.xmedius.com'
                             ).newSafebox('mail@mail.com')
      .then(result => console.log(result))
   })
  .catch(function(err) { console.log(err); })

// let jsonClient = new JsonClient.JsonClient( 'USER|09ca5098-997b-4d3b-a105-4ae7fd66e216',
//                            'acme',
//                            'https://portal.integration.xmedius.com'
//                          );
//
// jsonClient.newSafebox('mail@mail.com')
//   .then(result => console.log(result))
