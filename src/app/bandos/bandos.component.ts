import { Component, OnInit } from '@angular/core';
import { BandoComponent } from './bando/bando.component';
import { ChicagoOpenDataService } from '../chicago-open-data.service';
@Component({
  selector: 'app-bandos',
  templateUrl: './bandos.component.html',
  styleUrls: ['./bandos.component.css']
})
export class BandosComponent implements OnInit {
  bandos = [];
  
  constructor(private chicagoOpenDataService: ChicagoOpenDataService) { }

  ngOnInit() {
    this.chicagoOpenDataService.getBandos('').subscribe(data => this.bandos = data);
  }
}
