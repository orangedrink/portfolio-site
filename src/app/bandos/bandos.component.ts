import { Component, OnInit } from '@angular/core';
import  { Router, ActivatedRoute, Params } from '@angular/router';
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

  constructor(private chicagoOpenDataService: ChicagoOpenDataService, private activatedRoute: ActivatedRoute) { }

  command(queryString:string = ''){
    this.inputCommand = '';
    this.bandos = [];
    this.loading = true;
    this.cmdLines.push(`${this.prompt} ${queryString}`);
    this.chicagoOpenDataService.getBandos(queryString.replace(' ','&')).subscribe(data => {
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
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log(params)
      var str = "";
      for (var key in params) {
          if (str != "") {
              str += "&";
          }
          str += key + "=" + encodeURIComponent(params[key]);
      }
      console.log(str)
      this.command('$limit=10');
    });
  }
}
