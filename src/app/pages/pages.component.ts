import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {PageComponent} from './page/page.component';
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  pages = [];
  cmdLines = [];
  inputCommand: string;
  loading: boolean = false;
  prompt: string = "Orangedrink>>";
  commandWindowOpen = true;
  historyIndex: number = 0;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  scrollTerminal(){
    var objDiv = document.getElementById("terminal");
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  keyHandler(event) {
    console.log(event, event.keyCode, event.keyIdentifier);
 } 
 
  command(queryString: string = '') {
    this.inputCommand = '';
    this.pages = [];
    this.loading = true;
    this.cmdLines.push(`${this.prompt} ${queryString}`);
    this.historyIndex = this.cmdLines.length;
 /*    this.chicagoOpenDataService.getBandos(queryString.replace(/ /g, '&')).subscribe(data => {
      this.bandos = data;
      this.cmdLines.push(`Success: ${data.length} bandos found.`);
      this.loading = false;
      setTimeout(this.scrollTerminal, 10);
    }, err => {
      this.cmdLines.push(`ERROR: ${err}`);
      this.loading = false;
      setTimeout(this.scrollTerminal, 10);
    });
  */   return false;
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      var str = "";
      for (var key in params) {
        if (str != "") {
          str += "&";
        }
        str += key + "=" + params[key];
      }
      if(str){
        this.command(str);
      }
    });
  }
}
