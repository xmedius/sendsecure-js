import { get_user_token } from './modules/getUserToken.js';
import SendSecure from './modules/SendSecure.js'


// var inputElement = document.getElementById("input");
// inputElement.addEventListener("change", function(){
//   var file = this.files[0]; /* now you can work with the file list */
//
//   get_user_token('acme', 'username', 'password', 'https://portal.integration.xmedius.com')
//     .then(result => {
//       console.log(result);
//       var jsonClient = new SendSecure.JsonClient( result, 'acme', 'https://portal.integration.xmedius.com' );
//       jsonClient.newSafebox('mail@mail.com')
//         .then(result => {
//             console.log(result)
//             jsonClient.uploadFile(result.upload_url, {file: file })
//           })
//         })
//       })
//BORWSER

//             .then(response => {
//               var safebox = {
//                 safebox: {
//                   guid: result.guid,
//                   recipients: [
//                     {
//                       first_name: "",
//                       last_name: "",
//                       company_name: "",
//                       email: "email_recipient"
//                     }
//                   ],
//                   subject: "Donec rutrum congue leo eget malesuada. ",
//                   message: "Donec rutrum congue leo eget malesuada. Proin eget tortor risus. Nulla quis lorem ut libero malesuada feugiat. Nulla porttitor accumsan tincidunt...",
//                   document_ids: [ response.temporary_document.document_guid ],
//                   security_profile_id: 39,
//                   reply_enabled: true,
//                   expiration_value: 1,
//                   expiration_unit: "months",
//                   retention_period_type: "discard_at_expiration",
//                   encrypt_message:  true,
//                   double_encryption: false,
//                   public_encryption_key: result.public_encryption_key,
//                   notification_language: "en"
//                 }
//               }
//               jsonClient.commitSafebox(JSON.stringify(safebox))
//               .then(response => console.log(response))
//               .catch(function(err) { console.log(err); })
//             })
//             .catch(function(err) { console.log(err); })
//         })
//      })
//     .catch(function(err) { console.log(err); })
// });
//
// get_user_token('acme', '<username>', '<password>', 'https://portal.integration.xmedius.com')
//   .then(result => {
//     new SendSecure.JsonClient( result,
//                                'acme',
//                                'https://portal.integration.xmedius.com'
//                              ).getSecurityProfiles('mail@mail.com')
//       .then(result => {
//         console.log(result.security_profiles.map((e) => new SendSecure.Helpers.SecurityProfile(e)))
//       })
//    })
//   .catch(function(err) { console.log(err); })
//
// get_user_token('acme', '<username>', '<password>', 'https://portal.integration.xmedius.com')
//   .then(result => {
//     console.log(result)
//     new SendSecure.JsonClient( result,
//                                'acme',
//                                'https://portal.integration.xmedius.com'
//                              ).getEnterpriseSettings()
//       .then(result => console.log(new SendSecure.Helpers.EnterpriseSettings(result)))
//       .catch(function(err) { console.log(err); })
//    })
//   .catch(function(err) { console.log(err); })
//

//const inst = new  SendSecure.Client('apiToken', 'enterpriseAccount', "https://portal.integration.xmedius.com")
// var inputElement = document.getElementById("input");
// inputElement.addEventListener("change", function(){
//   var file = this.files[0]; /* now you can work with the file list */
//
// SendSecure.Client.getUserToken('acme', 'username', 'password', 'https://portal.integration.xmedius.com')
//   .then(result => {
//     let safebox = new SendSecure.Helpers.Safebox('mail@mail.com')
//     let recipient = new SendSecure.Helpers.Recipient( {email: 'email_recipient', first_name: 'Allan', last_name: 'Seymour'} );
//     let contactMethod = new SendSecure.Helpers.ContactMethod();
//     contactMethod.destinationType = 'cell_phone'
//     contactMethod.destination =  '+15145550000'
//     recipient.contactMethods = [ contactMethod ];
//     //let securityProfile = new SendSecure.Helpers.SecurityProfile
//     safebox.subject = 'Hello World';
//     safebox.message = 'This is an Hello World Message';
//     safebox.recipients = [ recipient ]
//     safebox.attachments = [ new SendSecure.Helpers.Attachment(file)];
//     let client = new  SendSecure.Client(result, 'acme', "https://portal.integration.xmedius.com");
//     client.submitSafebox(safebox)
//   })
// })

console.log('hhhh')
SendSecure.Client.getUserToken('acme', 'username', 'password', 'https://portal.integration.xmedius.com')
  .then(result => {
    console.log('toto')
    let safebox = new SendSecure.Helpers.Safebox('mail@mail.com')
    let recipient = new SendSecure.Helpers.Recipient( {email: 'email_recipient', first_name: 'Allan', last_name: 'Seymour'} );
    let contactMethod = new SendSecure.Helpers.ContactMethod();
    contactMethod.destinationType = 'cell_phone'
    contactMethod.destination =  '+15145550000'
    recipient.contactMethods = [ contactMethod ];
    //let securityProfile = new SendSecure.Helpers.SecurityProfile
    safebox.subject = 'Hello World';
    safebox.message = 'This is an Hello World Message';
    safebox.recipients = [ recipient ]
    safebox.attachments = [ new SendSecure.Helpers.Attachment("C:\\Users\\allan.seymour\\Pictures\\toto.txt"), new SendSecure.Helpers.Attachment("C:\\Users\\allan.seymour\\Pictures\\30c744a23fc46a203003a6e2e8990465.jpg")];
    let client = new  SendSecure.Client(result, 'acme', "https://portal.integration.xmedius.com");
    client.submitSafebox(safebox)
  })
  .catch (e => console.log(e))


//inst.initializeSafebox(new SendSecure.Helpers.Safebox('mail@mail.com'))
// var inputElement = document.getElementById("input");
// inputElement.addEventListener("change", function(){
//   var file = this.files[0]; /* now you can work with the file list */
//   var attachment = new SendSecure.Helpers.Attachment(file);
//   attachment.guid = "erjklfgberjkgerjkfhkerjferjkfhkerjfkerjerjerjg";
//   console.log(attachment.guid);
// });
//
// get_user_token('acme', 'username', 'password', 'https://portal.integration.xmedius.com')
//   .then(result => {
//     console.log('fgergegergerger');
//     var jsonClient = new SendSecure.JsonClient( result, 'acme', 'https://portal.integration.xmedius.com' );
//     jsonClient.newSafebox('mail@mail.com')
//      .then(result => {
//        console.log(result);
//        jsonClient.uploadFile(result.upload_url, { filePath: "C:\\Users\\allan.seymour\\Pictures\\30c744a23fc46a203003a6e2e8990465.jpg" })
//         // .then(response => { console.log(response) })
//         // .catch(e => { console.log(e) } );
//         .then(response => {
//           var safebox = {
//             safebox: {
//               guid: result.guid,
//               recipients: [
//                 {
//                   first_name: "",
//                   last_name: "",
//                   company_name: "",
//                   email: "email_recipient"
//                 }
//               ],
//               subject: "Donec rutrum congue leo eget malesuada. ",
//               message: "Donec rutrum congue leo eget malesuada. Proin eget tortor risus. Nulla quis lorem ut libero malesuada feugiat. Nulla porttitor accumsan tincidunt...",
//               document_ids: [ response.temporary_document.document_guid ],
//               security_profile_id: 39,
//               reply_enabled: true,
//               expiration_value: 1,
//               expiration_unit: "months",
//               retention_period_type: "discard_at_expiration",
//               encrypt_message:  true,
//               double_encryption: false,
//               public_encryption_key: result.public_encryption_key,
//               notification_language: "en"
//             }
//           }
//           jsonClient.commitSafebox(JSON.stringify(safebox))
//           .then(response => console.log(response))
//           .catch(function(err) { console.log(err); })
//         })
//      })
//      .catch(e => { console.log(e) });
//   })
//   .catch(e => { console.log(e) });
