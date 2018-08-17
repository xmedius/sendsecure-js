import SendSecure from '../../../src/sendsecure.js';
import _map from 'lodash/map';
import _partial from 'lodash/partial';
let expect = require('chai').expect;

export default describe ('BaseHelper', () => {
  let baseHelper;
  beforeEach(() => {
    baseHelper = new SendSecure.Helpers.BaseHelper();
  });

  describe('.property', () => {
    it('returns value if property exists, null otherwise', () => {
      expect(baseHelper.property({foo: 'bar'}, 'foo').orNull()).to.equal('bar');
      expect(baseHelper.property({foo: 'bar'}, 'baz').orNull()).to.be.null;
      expect(baseHelper.property({foo: ['bar', 'baz']}, 'foo').using(_partial(_map, _partial.placeholder, v => v.toUpperCase())).orDefault([])).to.deep.equal(['BAR', 'BAZ']);
      expect(baseHelper.property({foo: ['bar', 'baz']}, 'bar').using(_partial(_map, _partial.placeholder, v => v.toUpperCase())).orDefault([])).to.deep.equal([]);
    });
  });

  describe('.underscorify', () => {
    it('underscorifies the keys of an object', () => {
      let baseHelper2 = new SendSecure.Helpers.BaseHelper();
      baseHelper2.fooBaz = 'bar';
      baseHelper.fooBar = 'baz';
      baseHelper.innerBaseHelper = [baseHelper2, baseHelper2];
      expect(baseHelper.underscorifyKeys()).to.deep.equal(
        {
          foo_bar: 'baz',
          inner_base_helper: [ { foo_baz: 'bar' }, { foo_baz: 'bar' } ]
        }
      );
    });
  });
});
