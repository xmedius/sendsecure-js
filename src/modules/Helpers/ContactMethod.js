export default class ContactMethod {
  constructor(object) {
    if (object){
      this.destinationType = object.destinationType;
      this.destination = object.destination;
    }
  }
}
