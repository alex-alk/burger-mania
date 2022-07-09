import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Ingredient } from './ingredient';
import { Router } from '@angular/router/';
import { CartService } from '../cart/cart-service';
import { Burger } from './burger';
import { Globals } from '../globals';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.css']
})
@Injectable()
export class DesignComponent implements OnInit {

  allIngredients: Ingredient[] = [];
  wraps: Ingredient[] = [];
  proteins: Ingredient[] = [];
  veggies: Ingredient[] = [];
  cheeses: Ingredient[] = [];
  sauces: Ingredient[] = [];
  burgerUrl = '';
  
  constructor(public model: Burger, private httpClient: HttpClient, 
    private cart: CartService, private router: Router) { 
    
  }
  
  getAllIngredients(): Observable<Ingredient[]> {
    let globals = new Globals();
    return this.httpClient.get<Ingredient[]>(globals.apiURL + '/ingredients').pipe(
        map((result:any)=>{
           return result._embedded.ingredients;
        }));
  }
  
  updateIngredients(ingredient: any, event: any) {
    if (event.target.checked) {
      this.model.ingredients.push(ingredient["_links"].ingredient.href);
    } else {
      this.model.ingredients.splice(this.model.ingredients.findIndex(i => i === ingredient), 1);
    }
  }

  ngOnInit() {
    let globals = new Globals();
    this.burgerUrl = globals.apiURL + '/burgers';
    if(!sessionStorage.getItem('user')){
      this.router.navigate(['/login']);
    }
    let userl= JSON.parse(sessionStorage.getItem('user') ?? "");
    let link =  userl._links.self.href;
    this.model.user = link;
    this.model.ingredients = [];
    this.getAllIngredients().subscribe((data: Ingredient[]) => {
      this.allIngredients = data;
      this.wraps = this.allIngredients.filter(w => w.type === 'CHIFLĂ');
      this.proteins = this.allIngredients.filter(p => p.type === 'PROTEINĂ');
      this.veggies = this.allIngredients.filter(v => v.type === 'LEGUME');
      this.cheeses = this.allIngredients.filter(c => c.type === 'BRÂNZĂ');
      this.sauces = this.allIngredients.filter(s => s.type === 'SOS');
    });
   
  }
  
  onSubmit() {
    this.httpClient.post(
        this.burgerUrl,
        this.model, {
            headers: new HttpHeaders().set('Content-type', 'application/json'),
        }).subscribe(burger => console.log('-------added to db--------'));
    this.router.navigate(['/succes']);
  }
}
