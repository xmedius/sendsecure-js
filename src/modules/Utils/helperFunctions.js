export function camelCasify(object){
  if(!object) {
    return {};
  }
  return Object.assign(
    {},
    ...Object.keys(object).map(key => (
      { [key.replace(/(\_\w)/g, function(m){return m[1].toUpperCase();})]
      : object[key] })));
}

Date.prototype.strDate = function() {
  let year = this.getFullYear();
  let month = `0${this.getMonth()+1}`.slice(-2);
  let day  = `0${this.getDate()}`.slice(-2);
  return year + '-' + month + '-' + day;
};

Date.prototype.strTime = function() {
  let hours = `0${this.getHours()}`.slice(-2);
  let minutes = `0${this.getMinutes()}`.slice(-2);
  let seconds = `0${this.getSeconds()}`.slice(-2);
  return hours + ':' + minutes + ':' + seconds;
};

Date.prototype.zone = function() {
  let date = this.toString();
  let zone = date.substr(date.indexOf('GMT') + 3, 5);
  return zone.slice(0, 3) + ':' + zone.slice(3, 5);
};
