import { Component, OnInit, Injectable } from '@angular/core';
import { CartService } from './cart-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router/';
import { CartItem } from './cart-item';
import { Burger } from './burger';
import { Globals } from '../globals';

@Component({
  selector: 'app-cart',
  templateUrl: 'cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {

  model = {
    user: '',
    deliveryName: '',
    deliveryStreet: '',
    deliveryState: '',
    deliveryZip: '',
    deliveryCity: '',
    ccNumber: '',
    ccExpiration: '',
    ccCVV: '',
    burgers: []
  };
  user: any ;
  link: string = "";
  ids = [];
  burger: Burger = {
    name: '',
    ingredients: [],
    link:''
  }
  burgers: Burger[] = [];
  message: string = "";
  burgerlink = '';
  
  constructor(private cart: CartService, private router: Router, private httpClient: HttpClient) {
  }

  ngOnInit() {
    if(!sessionStorage.getItem('user')){
      this.router.navigate(['/login']);
    }
    this.cart.addToCart();
    //this.cart.setq();
  }
  setqq(){
    this.cart.setq();
  }
  getCartTotal() {
    let total = 0;
    this.cartItems.forEach(item => {
      total += item.lineTotal;
    });
    return total;
  }
  get cartTotal() {
    return this.getCartTotal();
  }
  get cartItems() {
    return this.cart.getItemsInCart();
  }


  onSubmit() {
    if(!(this.model.deliveryName&&this.model.deliveryStreet&&this.model.deliveryZip&&this.model.ccNumber
       &&this.model.ccExpiration&&this.model.ccCVV)){
       this.message = 'Toate câmpurile sunt obligatorii.';
    }else{
      let i = 0;
      let j: number;
      let quantities: [];
      quantities = JSON.parse(sessionStorage.getItem('quantities') ?? "");
      JSON.parse(sessionStorage.getItem('burgers') ?? "").forEach((burger: never) => {
        for( j = 0; j<+quantities[i]; ++j ){
          this.model.burgers.push(burger);
        }
        let userl= JSON.parse(sessionStorage.getItem('user') ?? "");
        let link =  userl._links.self.href;
        this.model.user = link;
        ++i;
      });
      console.log();
      let globals = new Globals();
      let apiURL = globals.apiURL;
      this.httpClient.post(
        apiURL + '/orders',
        this.model, {
            headers: new HttpHeaders().set('Content-type', 'application/json'),
        }).subscribe(burger => {console.log(this.model);this.router.navigate(['/orderok']);});
    }
  }

}
