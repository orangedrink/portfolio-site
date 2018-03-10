import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BandosComponent } from './bandos/bandos.component';
import { BandoComponent } from './bandos/bando/bando.component';
import { AboutComponent } from './about/about.component';
import { ChicagoOpenDataService } from './chicago-open-data.service';
import {HttpModule} from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { PagesComponent } from './pages/pages.component';
import { PageComponent } from './pages/page/page.component';


@NgModule({
  declarations: [
    AppComponent,
    BandosComponent,
    BandoComponent,
    AboutComponent,
    PagesComponent,
    PageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  providers: [ChicagoOpenDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
