import Helpers from './modules/Helpers/Helpers.js'
import JsonClient from './modules/JsonClient.js'
import Client from './modules/Client.js'

var SendSecure = {};

SendSecure.JsonClient = JsonClient;
SendSecure.Client = Client;
SendSecure.Helpers = Helpers;

export default SendSecure;
