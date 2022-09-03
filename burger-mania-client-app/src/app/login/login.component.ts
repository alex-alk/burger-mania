import { Component, OnInit } from '@angular/core';
import { User } from '../model/User';
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
}
