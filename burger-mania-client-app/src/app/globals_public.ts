export class Globals{
  apiURL  : string;
  usersURL : string;
  constructor(){
    this.apiURL = 'http://localhost:80/api';
    this.usersURL = this.apiURL + '/users';
  }
}
