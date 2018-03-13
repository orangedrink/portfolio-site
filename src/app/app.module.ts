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
import { DesktopComponent } from './desktop/desktop.component';
import { NoteComponent } from './desktop/note/note.component';
import { MovableModule, MovableDirective, MovableHandleDirective } from 'ng2-movable';
import { KeepHtmlPipe } from './keep-html.pipe';

@NgModule({
  declarations: [
    AppComponent,
    BandosComponent,
    BandoComponent,
    AboutComponent,
    DesktopComponent,
    NoteComponent,
    KeepHtmlPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    MovableModule,
  ],
  providers: [ChicagoOpenDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
