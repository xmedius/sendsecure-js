var SendSecure = require ('../build/sendsecure.cjs.min.js')

var userEmail = 'darthvader@empire.com',
      token = 'USER|1d495165-4953-4457-8b5b-4fcf801e621a',
      enterpriseAccount = 'deathstar',
      endpoint = 'https://portal.xmedius.com';

var safebox = new SendSecure.Helpers.Safebox(userEmail);
safebox.subject = 'Family matters';
safebox.message = 'Son, you will find attached the evidence.';

var recipient = new SendSecure.Helpers.Recipient( { email: 'lukeskywalker@rebels.com' } );
var contactMethod = new SendSecure.Helpers.ContactMethod();
contactMethod.destinationType = 'cell_phone'
contactMethod.destination =  '+15145550000'
recipient.contactMethods.push(contactMethod);
safebox.recipients.push(recipient);

safebox.attachments.push( new SendSecure.Helpers.Attachment("Birth_Certificate.pdf"));
var client = new  SendSecure.Client(token, enterpriseAccount, endpoint);
client.submitSafebox(safebox)
  .then( function(safeboxResponse) { console.log(safeboxResponse); })
  .catch(function(safeboxResponse) { console.error(error); } );
