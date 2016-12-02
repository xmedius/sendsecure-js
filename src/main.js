import { get_user_token } from './modules/getUserToken.js';
import SendSecure from './modules/SendSecure.js'


var inputElement = document.getElementById("input");
inputElement.addEventListener("change", function(){
  var file = this.files[0]; /* now you can work with the file list */

  get_user_token('acme', 'bonjour', 'Qwerty123', 'https://portal.integration.xmedius.com')
    .then(result => {
      var jsonClient = new SendSecure.JsonClient( result, 'acme', 'https://portal.integration.xmedius.com' );
      jsonClient.newSafebox('mail@mail.com')
        .then(result => {
            jsonClient.uploadFile(result.upload_url, file)
            .then(response => {
              var safebox = {
                safebox: {
                  guid: result.guid,
                  recipients: [
                    {
                      first_name: "",
                      last_name: "",
                      company_name: "",
                      email: "allan.seymour@xmedius.com"
                    }
                  ],
                  subject: "Donec rutrum congue leo eget malesuada. ",
                  message: "Donec rutrum congue leo eget malesuada. Proin eget tortor risus. Nulla quis lorem ut libero malesuada feugiat. Nulla porttitor accumsan tincidunt...",
                  document_ids: [ response.temporary_document.document_guid ],
                  security_profile_id: 39,
                  reply_enabled: true,
                  expiration_value: 1,
                  expiration_unit: "months",
                  retention_period_type: "discard_at_expiration",
                  encrypt_message:  true,
                  double_encryption: false,
                  public_encryption_key: result.public_encryption_key,
                  notification_language: "en"
                }
              }
              jsonClient.commitSafebox(JSON.stringify(safebox))
              .then(response => console.log(response))
              .catch(function(err) { console.log(err); })
            })
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
      .then(result => {
        console.log(result.security_profiles.map((e) => new SendSecure.Helpers.SecurityProfile(e)))
      })
   })
  .catch(function(err) { console.log(err); })

get_user_token('acme', 'bonjour', 'Qwerty123', 'https://portal.integration.xmedius.com')
  .then(result => {
    console.log(result)
    new SendSecure.JsonClient( result,
                               'acme',
                               'https://portal.integration.xmedius.com'
                             ).getEnterpriseSettings()
      .then(result => console.log(new SendSecure.Helpers.EnterpriseSettings(result)))
      .catch(function(err) { console.log(err); })
   })
  .catch(function(err) { console.log(err); })


const inst = new  SendSecure.Helpers.EnterpriseSettings();
inst.tototootot = 'test';
// var inputElement = document.getElementById("input");
// inputElement.addEventListener("change", function(){
//   var file = this.files[0]; /* now you can work with the file list */
//   var attachment = new SendSecure.Helpers.Attachment(file);
//   attachment.guid = "erjklfgberjkgerjkfhkerjferjkfhkerjfkerjerjerjg";
//   console.log(attachment.guid);
// });
