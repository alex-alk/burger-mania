import { Ingredient } from './ingredient';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class Burger {
  name: string = "";
  ingredients: Ingredient[] = [];
  user: string = "";
}
