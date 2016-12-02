export class SendSecureException {
  constructor (code, message) {
    this.code = code;
    this.message = message;
  }
}

export class UnexpectedServerResponseException extends SendSecureException {
  constructor(code, message){
    super (code, message)
  }
}
