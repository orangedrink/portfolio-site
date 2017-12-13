import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BandosComponent } from './bandos/bandos.component';
import { BandoComponent } from './bandos/bando/bando.component';
import { AboutComponent } from './about/about.component';
import { ChicagoOpenDataService } from './chicago-open-data.service';
import {HttpModule} from '@angular/http';



@NgModule({
  declarations: [
    AppComponent,
    BandosComponent,
    BandoComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [ChicagoOpenDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
