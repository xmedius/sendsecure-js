import JsonClient from './JsonClient.js'
import SecurityProfile from './Helpers/SecurityProfile.js'
import EnterpriseSettings from './Helpers/EnterpriseSettings.js'
import ExtensionFilter from './Helpers/ExtensionFilter.js'
import ContactMethod from './Helpers/ContactMethod.js'
import Attachment from './Helpers/Attachment.js'
import Safebox from './Helpers/Safebox.js'

var SendSecure = {};
var Helpers = {};

Helpers.SecurityProfile = SecurityProfile;
Helpers.EnterpriseSettings = EnterpriseSettings;
Helpers.ExtensionFilter = ExtensionFilter;
Helpers.ContactMethod = ContactMethod;
Helpers.Attachment = Attachment;
Helpers.Safebox = Safebox;
SendSecure.JsonClient = JsonClient;
SendSecure.Helpers = Helpers;

export default SendSecure;
