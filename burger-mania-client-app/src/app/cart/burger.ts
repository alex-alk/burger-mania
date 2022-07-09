import { Ingredient } from './ingredient';
import { Injectable } from '@angular/core';
/*
@Injectable({
  providedIn: 'root',
})*/
export class Burger {
  name: string;
  ingredients: Ingredient[];
  link: string;
  constructor(name:string, ingredients:[], link:string){
    this.name = name;
    this.ingredients = ingredients;
    this.link = link;
  }
}
