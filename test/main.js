import SendSecure from '../src/sendsecure.js'

describe("A suite", function() {
  it("contains spec with an expectation", function() {
    var jsonclient = new SendSecure.JsonClient("apiToken", 'enterpriseAccount', 'https://portal.integration.xmedius.com', 'en')
    expect(jsonclient.endpoint).toBe('https://portal.integration.xmedius.com');
  });
});
