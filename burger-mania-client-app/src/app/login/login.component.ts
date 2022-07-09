import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { NewUser } from './NewUser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Globals } from '../globals';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = {
    username: '',
    password: ''
  };
  
  globals: Globals;
  messagel: string = "";
  messager: string = "";
  newUser: NewUser = {
    username: '',
    password: '',
    fullname: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    phone: ''
  }
  constructor( private http: HttpClient, private router: Router) { 
    this.globals = new Globals();}
  
  ngOnInit() {
  }
  
  login(){
    let auth = false;
    this.http.get<any>(this.globals.usersURL + '/search/'+
                  'findByUsernameAndPassword?username='+this.user.username+'&password='+this.user.password)
                .subscribe(response => {
                   if (response['username']) {
                       sessionStorage.setItem('user',JSON.stringify(response));
                       auth = true;
                       this.router.navigate(['/loginok']);
                   } else {
                   }
                }
     );
     setTimeout(() => {
       if(!auth)this.messagel = 'Nume utilizator/parola greșite.';
     }, 4000);
  }
  
  register(){
    if(!(this.newUser.username &&
       this.newUser.password &&
       this.newUser.fullname &&
       this.newUser.street &&
       this.newUser.city &&
       this.newUser.state &&
       this.newUser.zip &&
       this.newUser.phone) ){
         this.messager = 'Toate câmpurile sunt obligatorii!';
     }else{
         this.http.post(
            this.globals.usersURL,
            this.newUser, {
                headers: new HttpHeaders().set('Content-type', 'application/json'),
            }).subscribe(burger => console.log('-------added to db--------'));
        this.router.navigate(['/regok']);
      }
  }
    

}
