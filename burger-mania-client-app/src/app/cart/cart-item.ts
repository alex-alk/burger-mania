export class CartItem {

  quantity = 1;
  burger: any;
  
  constructor(burger: any, quantity: number = 1) {
    this.burger = burger;
    this.quantity = quantity;
  }

  get lineTotal() {
    return this.quantity * 4.99;
  }

}
