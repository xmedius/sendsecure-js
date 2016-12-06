var SendSecure = require ('../../build/sendsecure.cjs.min.js')
SendSecure.Client.getUserToken('ck4', '<anemail>', '<password>', 'deviceid', 'deviceName', 'theApplicationType', 'https://portal.integration.xmedius.com')
  .then(result => {
    let safebox = new SendSecure.Helpers.Safebox('mail@mail.com')
    let recipient = new SendSecure.Helpers.Recipient( {email: '<anemail>', first_name: 'Allan', last_name: 'Seymour'} );
    let contactMethod = new SendSecure.Helpers.ContactMethod();
    contactMethod.destinationType = 'cell_phone'
    contactMethod.destination =  '+15145550000'
    recipient.contactMethods = [ contactMethod ];
    //let securityProfile = new SendSecure.Helpers.SecurityProfile
    safebox.subject = 'Hello World';
    safebox.message = 'This is an Hello World Message';
    safebox.recipients = [ recipient ]
    safebox.attachments = [ new SendSecure.Helpers.Attachment("/tmp/foo.txt"), new SendSecure.Helpers.Attachment("/tmp/bar.txt")];
    let client = new  SendSecure.Client(result, 'ck4', "https://portal.integration.xmedius.com");
    return client.securityProfiles('<anemail>')
    .then(securityProfiles => {
      safebox.securityProfile = securityProfiles[0];
      return client.submitSafebox(safebox)
    })
  })
  .then(e => console.log(e))
  .catch (e => console.log(e))
