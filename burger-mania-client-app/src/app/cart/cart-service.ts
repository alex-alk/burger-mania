import { CartItem } from './cart-item';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';

import { Burger } from './burger';
import { Ingredient } from './ingredient';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  cartItems: CartItem[];
  ingrdata:any = [];
  total: number = 0;
    
  constructor(private httpClient: HttpClient) {
    this.cartItems = [];
  }
  
  public getR(link: any) {
        return this.httpClient.get(link);
  } 
  
  setq(){
    let quantities: number[] = [];
    this.cartItems.forEach(item =>{
      quantities.push(+item.quantity);
      this.total += item.quantity*4.99;
      sessionStorage.setItem('quantities', JSON.stringify(quantities));
    });
  }
  addToCart() {
    let links = [];
    this.cartItems = [];
    let quantities: any[] = [];
    let qdef = false;
    if(sessionStorage.getItem('quantities')){
      quantities = JSON.parse(sessionStorage.getItem('quantities') ?? "");
      qdef = true;
    }
    if(JSON.parse(sessionStorage.getItem('burgers') ?? ""))
      links = JSON.parse(sessionStorage.getItem('burgers') ?? "");
    let i = 0;
    links.forEach((link: any)=>{ 
        this.getR(link).subscribe((result: any)=>{
              const ingrlink = result._links.ingredients.href;
              this.getR(ingrlink).subscribe((ingdata: any) =>{
                            if(!qdef)quantities[i]=1;
                            quantities.push(quantities[i]);
                            sessionStorage.setItem('quantities',JSON.stringify(quantities));
                            this.ingrdata = ingdata._embedded.ingredients;
                            this.cartItems.push(
                                new CartItem(
                                    new Burger(result.name, this.ingrdata, result._links.burger.href),quantities[i]));
              ++i;                      
              });
        })      
    });
  }

  getItemsInCart() {
    return this.cartItems;
  }

  getCartTotal() {
    let total = 0;
    this.cartItems.forEach(item => {
      total += item.lineTotal;
    });
    return total;
  }

  emptyCart() {
    this.cartItems = [];
  }

}
