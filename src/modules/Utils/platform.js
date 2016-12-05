var fetch = null;
var fs = null;
var path = null;
var lookup = null;
var isNode = false;
var FormData = null;

if ((typeof process !== 'undefined') && (process.release.name === 'node')){
  fetch = require('node-fetch');
  fs = require ('fs');
  path = require('path');
  lookup = require('mime-types').lookup;
  FormData = require('form-data');
  isNode = true;

} else {
  fetch = window.fetch;
  FormData = window.FormData;
}

export { fetch } ;
export { fs } ;
export { lookup } ;
export { isNode } ;
export { path } ;
export { FormData } ;
