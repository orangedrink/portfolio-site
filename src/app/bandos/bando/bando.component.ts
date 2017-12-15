import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bando',
  templateUrl: './bando.component.html',
  styleUrls: ['./bando.component.css']
})
export class BandoComponent implements OnInit {
  @Input() bando: any;
  constructor() { }
  getAddress(){
    return `${this.bando.address_street_number} ${this.bando.address_street_direction} ${this.bando.address_street_name} ${this.bando.address_street_suffix} CHICAGO`;
  };
  ngOnInit() {
  }

}
