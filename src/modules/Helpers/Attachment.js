import _isObject from 'lodash/isObject'
import _isArray from 'lodash/isArray'
import _map from 'lodash/map'
import _reduce from 'lodash/reduce'
import _all from 'lodash/every'
import { isNode, fs, lookup, path } from '../Utils/platform.js'

export default class Attachment {
  /**
  * Create a new isntance of Atatchment
  * @since 0.1.0
  * @param {String|Object|File} In NodeJS: either the path to a file on disk or an object , in browser a File object (cf. https://developer.mozilla.org/en/docs/Web/API/File).
  * @returns {Attachment} Returns a new instance of Attachment,
  *  else `false`.
  * @example
  *
  * // In browser
  * var inputElement = document.getElementById("input");
  * inputElement.addEventListener("change", function(){
  *  var file = this.files[0];
  *  var attachments = new Attachment(file);
  * });
  *
  * //In NodeJS
  * var attachment = new Attachments('/tmp/foobar.txt');
  * or  var attachment = new Atatchment({filename: 'foobar.txt', stream: fs.readFileSync('/tmp/foobar.txt'), contentType: 'text/plain'});
  */
  constructor(arg) {
    if (isNode){
      if (typeof arg == 'string'){
        this.filename = path.basename(arg);
        this.contentType = lookup(arg);
        this.stream = fs.readFileSync(arg);
      } else {
        if(_all(['filename', 'stream', 'contentType']), e => e in arg){
          this.filename = arg.filename;
          this.contentType = arg.contentType;
          this.stream = arg.stream;
        }
        else {
          // TODO exception?
        }
      }
    } else {
      this.file = arg;
    }
    this.guid = null
    Object.seal(this);
  }

  underscorify(){
    const underscorify = (s) => s.replace(/([A-Z])/g, function(m){return `_${m.toLowerCase()}`;});
    let result = _reduce(this, (res, value, key) => {
      let r = null;
      if (_isObject(value)){
        if (_isArray(value)){
          r = _map(value, (e) => { return e.underscorify() } )
        }
        else {
          r = value;
        }
      }
      else {
        r = value;
      }

      res[underscorify(key)] = r;
      return res;
    }, {})
    return result;
  }
}
