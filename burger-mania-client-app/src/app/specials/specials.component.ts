import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Burger } from '../cart/burger';
import { Ingredient } from './ingredient';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CartService } from '../cart/cart-service';
import { Router } from '@angular/router/';
import { Globals } from '../globals';

@Component({
  selector: 'app-specials',
  templateUrl: './specials.component.html',
  styleUrls: ['./specials.component.css']
})
export class SpecialsComponent implements OnInit {

  myBurgers: Burger[] = [];
  burger: Burger = {
    name: '',
    ingredients: [],
    link: ''
  }
  arr: any = [];
  ingdata:any = [];
  burgersURL = '';
  globals: Globals;
   
  constructor(private httpClient: HttpClient, private cart: CartService, private router: Router) {
    
    this.globals = new Globals();
   }

  ngOnInit() {
      this.burgersURL = this.globals.apiURL + '/burgers';
      if(!sessionStorage.getItem('user')){
        this.router.navigate(['/login']);
      }
      let user = JSON.parse(sessionStorage.getItem('user')?? "");
      let userURL = user._links.self.href;
      this.getR<any>(this.burgersURL).subscribe(data =>{
        this.arr = data._embedded.burgers;
        //get burgers by user
        
        for(let item of this.arr){
          this.getR<any>(item._links.user.href).subscribe(data =>{
              if(data._links.self.href==userURL){
              
                  this.burger.name = item.name;
                  //now convert links to data
                  const ingrlink = item._links.ingredients.href;
                  this.getR<any>(ingrlink).subscribe(ingdata =>{
                                    this.ingdata = ingdata._embedded.ingredients;
                                    this.myBurgers.push(new Burger(item.name, this.ingdata, item._links.burger.href));
                                });
             }
          });
        }
       });
  }
  
  public getR<T>(link: string) {
        return this.httpClient.get<T>(link);
  }
  
  orderThis(link: String) {
    if(!sessionStorage.getItem('user')){
      this.router.navigate(['/login']);
    }
    
    let burgersInCart = [];
    if(sessionStorage.getItem('burgers')){
      burgersInCart=JSON.parse(sessionStorage.getItem('burgers') ?? "");
    }
    let twin = false;
    for(let burger of burgersInCart){
      if (burger == link)twin = true;
    }
    if(!twin)burgersInCart.push(link);
    sessionStorage.setItem('burgers',JSON.stringify(burgersInCart));
    //this.cart.addToCart();
    this.router.navigate(['/cos']);
  }

}
