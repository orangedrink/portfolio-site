import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BandosComponent } from './bandos/bandos.component';
const routes: Routes = [
  { path: '', redirectTo: 'bandos', pathMatch: 'full' },
  { path: 'bandos', component: BandosComponent },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
