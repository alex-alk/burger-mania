import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DesignComponent } from './design/design.component';
import { RecentsComponent } from './recents/recents.component';
import { SpecialsComponent } from './specials/specials.component';
import { LocationsComponent } from './locations/locations.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { SuccessComponent } from './success/success.component';
import { LoginokComponent } from './loginok/loginok.component';
import { RegokComponent } from './regok/regok.component';
import { OrderokComponent } from './orderok/orderok.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'design', component: DesignComponent },
  { path: 'recente', component: RecentsComponent },
  { path: 'specialitati', component: SpecialsComponent },
  { path: 'locatii', component: LocationsComponent },
  { path: 'cos', component: CartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'succes', component: SuccessComponent },
  { path: 'loginok', component: LoginokComponent },
  { path: 'regok', component: RegokComponent },
  { path: 'orderok', component: OrderokComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
