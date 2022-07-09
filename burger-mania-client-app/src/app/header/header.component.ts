import { Component, OnInit } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { CartService } from '../cart/cart-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  constructor(public cart: CartService) { }

  ngOnInit() {}

}
