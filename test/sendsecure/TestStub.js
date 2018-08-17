import * as Utils from '../../src/modules/Utils/platform.js';
let sinon = require('sinon');
export var stub = sinon.stub(Utils, 'fetch').withArgs(sinon.match.string, sinon.match.object);