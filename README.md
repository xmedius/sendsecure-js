**XMediusSENDSECURE (SendSecure)** is a collaborative file exchange platform that is both highly secure and simple to use.
It is expressly designed to allow for the secured exchange of sensitive documents via virtual SafeBoxes.

SendSecure comes with a **Web API**, which is **RESTful**, uses **HTTPs** and returns **JSON**.

Specific libraries have been published for various languages:
[C#](https://github.com/xmedius/sendsecure-csharp),
[Java](https://github.com/xmedius/sendsecure-java),
**JavaScript**,
[PHP](https://github.com/xmedius/sendsecure-php),
[Python](https://github.com/xmedius/sendsecure-python)
and
[Ruby](https://github.com/xmedius/sendsecure-ruby).

# sendsecure-js

**This library allows you to use the SendSecure Web API via JavaScript.**

With this library, you will be able to:
* Authenticate SendSecure users
* Create new SafeBoxes

# Table of Contents

* [Installation](#installation)
* [Quick Start](#quickstart)
* [Usage](#usage)
* [License](#license)
* [Credits](#credits)

<a name="installation"></a>
# Installation

## Prerequisites

- Any of the most popular Web Browsers, latest version
- The SendSecure service, provided by [XMedius](https://www.xmedius.com/en/products?source=sendsecure-js) (demo accounts available on demand)

## Install Package

```javascript
TBD
```

<a name="quickstart"></a>
# Quick Start

## Authentication (Retrieving API Token)

Authentication is done using an API Token, which must be first obtained based on SendSecure enterprise account and user credentials.
Here is the minimum code to get such a user-based API Token.

```javascript
SendSecure.Client.getUserToken('deathstar', 'darthvader', 'd@Rk$1De', 'deviceid', 'deviceName', 'theApplicationType', 'https://portal.integration.xmedius.com')
  .then( token => console.log(token))
  .catch(e => { throw error; })


SendSecure.Client.getUserToken('deathstar', 'darthvader', 'd@Rk$1De')
  .then(userToken => {
                console.log(userToken);
});
```

## SafeBox Creation

Here is the minimum required code to create a SafeBox – with 1 recipient, a subject, a message and 1 attachment.
This example uses the user's *default* security profile (which requires to be set in the account).

### With SafeBox Helper Class

```javascript
var inputElement = document.getElementById("input");
inputElement.addEventListener("change", function(){
  var file = this.files[0]; /* now you can work with the file list */

SendSecure.Client.getUserToken('acme', 'bonjour', 'Qwerty123', 'https://portal.integration.xmedius.com')
  .then(result => {
    let safebox = new SendSecure.Helpers.Safebox('mail@mail.com')
    let recipient = new SendSecure.Helpers.Recipient( {email: 'allan.seymour@xmedius.com', first_name: 'Allan', last_name: 'Seymour'} );
    let contactMethod = new SendSecure.Helpers.ContactMethod();
    contactMethod.destinationType = 'cell_phone'
    contactMethod.destination =  '+15145550000'
    recipient.contactMethods = [ contactMethod ];
    //let securityProfile = new SendSecure.Helpers.SecurityProfile
    safebox.subject = 'Hello World';
    safebox.message = 'This is an Hello World Message';
    safebox.recipients = [ recipient ]
    safebox.attachments = [ new SendSecure.Helpers.Attachment(file)];
    let client = new  SendSecure.Client(result, 'acme', "https://portal.integration.xmedius.com");
    return client.submitSafebox(safebox)
  })
  .then(e => console.log(e))
  .catch(e => console.log(e))
})
```

<!-- ### Without SafeBox Helper Class

```javascript
TBD
```
 -->
<a name="usage"></a>
# Usage

## Helper Methods

### Get User Token
```
getUserToken(enterpriseAccount, username, password, deviceId, deviceName, applicationType, endpoint, oneTimePassword)
```
Creates and returns an API Token for a specific user within a SendSecure enterprise account.
Calling this method again with the exact same params will always return the same Token.

Param             | Type   | Definition
------------------|--------|-----------
enterpriseAccount | String | The SendSecure enterprise account
username          | String | The username of a SendSecure user of the current enterprise account
password          | String | The password of this user
deviceId          | String | The unique ID of the device used to get the Token 
deviceName        | String | The name of the device used to get the Token
applicationType   | String | The type/name of the application used to get the Token ("sendsecure-js" will be used by default if empty)
endpoint          | String | The URL to the SendSecure service ("https://portal.xmedius.com" will be used by default if empty)
oneTimePassword   | String | The one-time password of this user (if any)

### Client Object Constructor
```
constructor(apiToken, enterpriseAccount, endpoint, locale)
```

Param             | Type   | Definition
------------------|--------|-----------
apiToken          | String | The API Token to be used for authentication with the SendSecure service
enterpriseAccount | String | The SendSecure enterprise account
endpoint          | String | The URL to the SendSecure service ("https://portal.xmedius.com" will be used by default if empty)
locale            | String | The locale in which the server errors will be returned ("en" will be used by default if empty)

### Get Enterprise Settings
```
enterpriseSettings()
```
Returns all values/properties of the enterprise account's settings specific to SendSecure.

### Get Default Security Profile
```
defaultSecurityProfile(userEmail)
```
Returns the default security profile (if it has been set) for a specific user, with all its setting values/properties.

Param      | Type   | Definition
-----------|--------|-----------
userEmail  | String | The email address of a SendSecure user of the current enterprise account

### Get Security Profiles
```
securityProfiles(userEmail)
```
Returns the list of all security profiles available to a specific user, with all their setting values/properties.

Param      | Type   | Definition
-----------|--------|-----------
userEmail  | String | The email address of a SendSecure user of the current enterprise account

### Initialize SafeBox
```
initializeSafebox(safebox)
```
Pre-creates a SafeBox on the SendSecure system and returns the updated Safebox object with the necessary system parameters filled out (GUID, public encryption key, upload URL).

Param      | Type    | Definition
-----------|---------|-----------
safebox    | Safebox | A Safebox object to be initialized by the SendSecure system

### Upload Attachment
```
uploadAttachment(safebox, attachment)
```
Uploads the specified file as an Attachment of the specified SafeBox and returns the updated Attachment object with the GUID parameter filled out.

Param      | Type       | Definition
-----------|------------|-----------
safebox    | Safebox    | An initialized Safebox object
attachment | Attachment | An Attachment object - the file to upload to the SendSecure system

### Commit SafeBox
```
commitSafebox(safebox)
```
Finalizes the creation (commit) of the SafeBox on the SendSecure system.
This actually "Sends" the SafeBox with all content and contact info previously specified.

Param      | Type    | Definition
-----------|---------|-----------
safebox    | Safebox | A Safebox object already initialized, with security profile, recipient(s), subject and message already defined, and attachments already uploaded. 

### Submit SafeBox
```
submitSafebox(safebox)
```
This method is a high-level combo that initializes the SafeBox, uploads all attachments and commits the SafeBox.

Param      | Type    | Definition
-----------|---------|-----------
safebox    | Safebox | A non-initialized Safebox object with security profile, recipient(s), subject, message and attachments (not yet uploaded) already defined. 


## Helper Modules

### Safebox

### SafeboxResponse

### Attachment

### Recipient

### ContactMethod

### SecurityProfile

### EnterpriseSettings

### ExtensionFilter

<a name="license"></a>
# License

sendsecure-js is distributed under [MIT License](https://github.com/xmedius/sendsecure-js/blob/master/LICENSE).

<a name="credits"></a>
# Credits

sendsecure-js is developed, maintained and supported by [XMedius Solutions Inc.](https://www.xmedius.com?source=sendsecure-js)
The names and logos for sendsecure-js are trademarks of XMedius Solutions Inc.

![XMedius Logo](https://s3.amazonaws.com/xmc-public/images/xmedius-site-logo.png)
