import { Injectable } from '@angular/core';
@Injectable({
  // we declare that this service should be created
  // by the root application injector.
  providedIn: 'root',
})
export class Ingredient {
  id: string;
  name: string;
  type: string;
  constructor(){
    this.id = '';
    this.name = '';
    this.type = '';
  }
}
