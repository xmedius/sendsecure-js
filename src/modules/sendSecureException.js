export class SendSecureException extends Error {
  constructor (code, message, responseContent) {
    super();
    this.code = code;
    this.message = message;
    this.responseContent = responseContent;
  }
}

export class UnexpectedServerResponseException extends SendSecureException {
  constructor(code, message){
    super (code, message);
  }
}
