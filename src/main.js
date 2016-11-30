import { get_user_token } from './modules/getUserToken.js';

get_user_token('acme', 'bonjour', 'Qwerty123', 'https://portal.integration.xmedius.com')
  .then(result => console.log(result))
  .catch(function(err) { console.log(err); })
