export default class Attachment {
  constructor(file) {
    this.file = file
  }

  set guid(guid) { this._guid = guid; }
  get guid() { return this._guid;}
}
