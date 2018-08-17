var SendSecure = require ('../build/sendsecure.cjs.min.js')

var userEmail = 'darthvader@empire.com',
            userId = "123456",
            token = 'USER|1s234567-1234-5678-8b5b-4fcf801e691a',
            enterpriseAccount = 'deathstar',
            endpoint = 'https://portal.xmedius.com';

var safebox = new SendSecure.Helpers.Safebox({
  userEmail: userEmail,
  subject: 'Family matters',
  message: 'Son, you will find attached the evidence.'
});

var recipient = new SendSecure.Helpers.Participant({
  firstName: "Luke",
  lastName: "Skywalker",
  email: "lukeskywalker@rebels.com",
});

recipient.guestOptions.companyName = "rebels";
var contactMethod = new SendSecure.Helpers.ContactMethod({
  destinationType: "cell_phone",
  destination: "+15145550000"
});
recipient.guestOptions.addContactMethod(contactMethod);
safebox.participants.push(recipient);

safebox.attachments.push(new SendSecure.Helpers.Attachment("Birth_Certificate.pdf"));

safebox.securityOptions = new SendSecure.Helpers.SecurityOptions({
  retentionPeriodType: "discard_at_expiration",
  retentionPeriodValue: 8,
  retentionPeriodUnit: "hours" });

var client = new SendSecure.Client(userId, token, enterpriseAccount, endpoint);

client.submitSafebox(safebox)
  .then(console.log)
  .catch(console.error);
