import _isArray from 'lodash/isArray';
import _reduce from 'lodash/reduce';
import _map from 'lodash/map';
import _identity from 'lodash/identity';

export default class BaseHelper {
  underscorifyKeys(){
    const underscorify = (s) => s.replace(/([A-Z])/g, function(m){return `_${m.toLowerCase()}`;});
    let result = _reduce(this, (res, value, key) => {
      res[underscorify(key)] = _isArray(value) ? _map(value, (e) => { return e.underscorifyKeys(); } ) : value;
      return res;
    }, {});
    return result;
  }

  property(object, prop) {
    class propertyHandler {
      constructor(o, p){
        this.o = o;
        this.p = p;
        this.callback = _identity;
        this.process = (def) => (this.o && this.p in this.o) ? this.callback(this.o[this.p]) : def;
      }

      using(cbk){
        this.callback = cbk;
        return this;
      }

      orDefault(def) {
        return this.process(def)
      }

      orNull() {
        return this.process(null);
      }
    }

    return new propertyHandler(object, prop);
  }

}

export const PARAMS = Object.freeze({
  CREATION: Symbol('creation'),
  EDITION: Symbol('edition'),
  CONTACT_DESTRUCTION: Symbol('contact_destruction')
});
