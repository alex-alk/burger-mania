import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Globals } from '../globals';
import { FormControl, FormGroup } from '@angular/forms';
import { defer, Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  globals: Globals;
  messagel: string = "";
  messager: string = "";
  pendingApiCall: boolean = false;
  pendingApiCalls: boolean = true;
  
  newUserForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    verifyPassword: new FormControl(''),
    phone: new FormControl(''),
  });

  observable =  () => { 
    return defer(() =>new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({});
      }, 300);
    }))
    ;}

  actions: any = {
    postSignup: this.observable
  };


  constructor( private http: HttpClient, private router: Router) { 
    this.globals = new Globals();
  }
  
  ngOnInit() {
  }
  
  onClickSignup(){
    this.pendingApiCall = true;
    this.actions.postSignup(this.newUserForm.value).subscribe(
      (result: any) => {
        this.pendingApiCall = false;
      },
      (error: any) => {
        this.pendingApiCall = false;
      },
      () => {}
    );
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

