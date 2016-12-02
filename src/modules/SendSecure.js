import Helpers from './Helpers/Helpers.js'
import JsonClient from './JsonClient.js'
import Client from './Client.js'

var SendSecure = {};

SendSecure.JsonClient = JsonClient;
SendSecure.Client = Client;
SendSecure.Helpers = Helpers;

export default SendSecure;
