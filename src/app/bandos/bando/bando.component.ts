import { Component, OnInit, Input } from '@angular/core';
import { ChicagoOpenDataService } from '../../chicago-open-data.service';

@Component({
  selector: 'app-bando',
  templateUrl: './bando.component.html',
  styleUrls: ['./bando.component.css']
})
export class BandoComponent implements OnInit {S
  @Input() bando: any;
  constructor(private chicagoOpenDataService: ChicagoOpenDataService) { }
  
  getNeighborhood(id:number){
    return this.chicagoOpenDataService.getNeighborhood(id);
  }
  
  getAddress(){
    return `${this.bando.address_street_number} ${this.bando.address_street_direction} ${this.bando.address_street_name} ${this.bando.address_street_suffix} CHICAGO`;
  };
  
  ngOnInit() {
  }

}
