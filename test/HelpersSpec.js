import SendSecure from '../src/sendsecure.js';
import * as Utils from '../src/modules/Utils/platform.js';
let sinon = require('sinon');
//let fs = require('fs')
let expect = require('chai').expect;

export default describe('Helpers', () => {
  describe ('BaseHelper', () => {
    let baseHelper;
    beforeEach(() => {
      baseHelper = new SendSecure.Helpers.BaseHelper();
    });

    describe('.propertyOrNull', () => {
      it('returns value if property exists, null otherwise', () => {
        expect(baseHelper.propertyOrNull({foo: 'bar'}, 'foo')).to.equal('bar');
        expect(baseHelper.propertyOrNull({foo: 'bar'}, 'baz')).to.be.null;
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

  describe('Attachment', () => {
    before (() => {
      sinon.stub(Utils.fs, 'readFileSync').withArgs(sinon.match.string).returns('a stream');
    });
    let attachment;
    it ('inherits from BaseHelper', () => {
      expect(SendSecure.Helpers.Attachment.prototype).to.be.an.instanceof(SendSecure.Helpers.BaseHelper);
    });

    describe('.ctor', () => {
      it('fills properties of an attachment instance when a string corresponding to a filepath is passed as an argument', () => {
        attachment = new SendSecure.Helpers.Attachment('/tmp/foo.txt');
        expect(attachment.guid).to.equal(null);
        expect(attachment.filename).to.equal('foo.txt');
        expect(attachment.stream).to.equal('a stream');
        expect(attachment.contentType).to.equal('text/plain');
      });

      it('fills properties of an attachment instance when a object with all the required value is passed as an argument', () => {
        attachment = new SendSecure.Helpers.Attachment({filename: 'foo', stream: 'another stream', contentType: 'application/x-bzip'});
        expect(attachment.guid).to.equal(null);
        expect(attachment.filename).to.equal('foo');
        expect(attachment.stream).to.equal('another stream');
        expect(attachment.contentType).to.equal('application/x-bzip');
      });

      it('throws when one value is missing', () => {
        expect(() => new SendSecure.Helpers.Attachment({filename: 'foo', contentType: 'application/x-bzip'})).to.throw(Error);
      });

      it('is a sealed object', () => {
        expect (new SendSecure.Helpers.Attachment('/tmp/foobar.png')).to.be.sealed;
      });

    });
  });

  describe('ContactMethod', () => {
    let contactMethod;
    it ('inherits from BaseHelper', () => {
      expect(SendSecure.Helpers.ContactMethod.prototype).to.be.an.instanceof(SendSecure.Helpers.BaseHelper);
    });

    describe('.ctor', () => {
      it('fills properties of a contactMethod', () => {
        contactMethod = new SendSecure.Helpers.ContactMethod({destinationType: 'phone', destination: '1234'});
        expect(contactMethod.destination).to.equal('1234');
        expect(contactMethod.destinationType).to.equal('phone');
        expect(contactMethod).to.be.sealed;
      });
    });
  });
});
