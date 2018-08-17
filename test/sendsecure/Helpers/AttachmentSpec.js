import SendSecure from '../../../src/sendsecure.js';
import * as Utils from '../../../src/modules/Utils/platform.js';
let sinon = require('sinon');
let expect = require('chai').expect;

export default describe('Attachment', () => {
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