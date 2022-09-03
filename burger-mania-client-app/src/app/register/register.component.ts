import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Globals } from '../globals';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  globals: Globals;
  messagel: string = "";
  messager: string = "";
  
  newUserForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    verifyPassword: new FormControl(''),
    phone: new FormControl(''),
  });

  @Input() actions = {
    postSignup: (newUser: any) => new Promise((resolve, reject) => {
      resolve({});
  })};
  constructor( private http: HttpClient, private router: Router) { 
    this.globals = new Globals();
  }
  
  ngOnInit() {
  }
  
  onClickSignup(){
    this.actions.postSignup(this.newUserForm.value);
    // if(!(this.newUser.username &&
    //    this.newUser.password &&
    //    this.newUser.verifyPassword &&
    //    this.newUser.email &&
    //    this.newUser.phone) ){
    //      this.messager = 'Toate câmpurile sunt obligatorii!';
    //  }else{
    //      this.http.post(
    //         this.globals.usersURL,
    //         this.newUser, {
    //             headers: new HttpHeaders().set('Content-type', 'application/json'),
    //         }).subscribe(burger => console.log('-------added to db--------'));
    //     this.router.navigate(['/regok']);
    //   }
  }
    

}

