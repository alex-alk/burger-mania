import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecentsComponent } from './recents/recents.component';

import { HttpClientModule} from '@angular/common/http';
import { DesignComponent } from './design/design.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { CloudtitleComponent } from './cloudtitle/cloudtitle.component';
import { GroupBoxComponent } from './group-box/group-box.component';
import { CartComponent } from './cart/cart.component';
import { FormsModule } from '@angular/forms';
import { BigButtonComponent } from './big-button/big-button.component';
import { NonWrapsPipe } from './recents/NonWrapsPipe';
import { WrapsPipe } from './recents/WrapsPipe';
import { LittleButtonComponent } from './little-button/little-button.component';
import { FooterComponent } from './footer/footer.component';
import { SpecialsComponent } from './specials/specials.component';
import { LocationsComponent } from './locations/locations.component';
import { LoginComponent } from './login/login.component';
import { SuccessComponent } from './success/success.component';
import { LoginokComponent } from './loginok/loginok.component';
import { RegokComponent } from './regok/regok.component';
import { OrderokComponent } from './orderok/orderok.component';

@NgModule({
  declarations: [
    AppComponent,
    RecentsComponent,
    DesignComponent,
    HeaderComponent,
    HomeComponent,
    CloudtitleComponent,
    GroupBoxComponent,
    CartComponent,
    BigButtonComponent,
    NonWrapsPipe,
    WrapsPipe,
    LittleButtonComponent,
    FooterComponent,
    SpecialsComponent,
    LocationsComponent,
    LoginComponent,
    SuccessComponent,
    LoginokComponent,
    RegokComponent,
    OrderokComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
