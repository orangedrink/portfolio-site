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
  cmdLines = [];
  inputCommand: string;
  loading: boolean = false;
  prompt: string = "BandoHacker>>";
  
  constructor(private chicagoOpenDataService: ChicagoOpenDataService) { }

  command(queryString:string = ''){
    this.inputCommand = '';
    this.bandos = [];
    this.loading = true;
    this.cmdLines.push(`${this.prompt} ${queryString}`);
    this.chicagoOpenDataService.getBandos(queryString).subscribe(data => {
      this.bandos = data;
      this.cmdLines.push(`Success: ${data.length} bandos found.`);
      this.loading = false;
    }, err =>{
      this.cmdLines.push(`ERROR: ${err}`);
      this.loading = false;
    })
    return false;
  }

  ngOnInit() {
    //this.chicagoOpenDataService.getBandos('$limit=10').subscribe(data => this.bandos = data);
  }
}
