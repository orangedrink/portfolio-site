import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {PageComponent} from './page/page.component';
import {ControlValueAccessor} from '@angular/forms';
  
export class XpWindow {
    public onTop:boolean;
    public closed:boolean;
    public minimized:boolean;
    public maximized:boolean;
}
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css'],
})
export class PagesComponent implements OnInit {
  pages = [];
  cmdLines = [];
  inputCommand: string;
  loading: boolean = false;
  prompt: string = "Orangedrink>>";
  historyIndex: number = 0;
  notes: XpWindow;
  terminal: XpWindow;

  constructor(private activatedRoute: ActivatedRoute) {
    this.notes = new XpWindow();
    this.notes.closed = true;
    this.terminal = new XpWindow();
  }

  scrollTerminal(){
    var objDiv = document.getElementById("terminal");
    objDiv.scrollTop = objDiv.scrollHeight;
  }
  closeWindow(e, target){
    console.log(target);
    if(target=='terminal'){
      this.terminal.closed=true;
    }else{
      this.notes.closed=true;
    }
    e.stopPropagation();
    e.preventDefault();
  }
  minimizeWindow(e, target){
    console.log(e);
    if(target=='terminal'){
      this.terminal.closed=false;
      this.terminal.maximized = false;
      this.terminal.minimized=!this.terminal.minimized;
      this.terminal.onTop=false;
    }else{
      this.notes.closed=false;
      this.notes.maximized = false;
      this.notes.minimized=!this.notes.minimized;
      this.notes.onTop=false;
    }
    e.stopPropagation();
    e.preventDefault();
  }
  maximizeWindow(e, target){
    console.log(e);
    if(target=='terminal'){
      this.terminal.closed=false;
      this.terminal.minimized = false;
      this.terminal.maximized=!this.terminal.maximized;
      this.toTop('terminal');
    }else{
      this.notes.closed=false;
      this.notes.minimized = false;
      this.notes.maximized=!this.notes.maximized;
      this.toTop('notes');
    }
    e.stopPropagation();
    e.preventDefault();
  }
  keyHandler(event) {
    //console.log(event, event.keyCode, event.keyIdentifier);
  } 
  
  toTop(target){
    console.log(target);
    if(target==='terminal'){
      this.terminal.closed=false;
      this.terminal.minimized=false;
      this.terminal.onTop=true;
      this.notes.onTop=false;
    }else{
      this.notes.closed=false;
      this.notes.minimized=false;
      this.terminal.onTop=false;
      this.notes.onTop=true;
    }
  }


  command(queryString: string = '', terminalWindow = null,  notesWindow = null) {
    if(terminalWindow && notesWindow){
      this.toTop('terminal');
    }
    this.inputCommand = '';
    //this.pages = [];
    this.loading = true;
    this.cmdLines.push(`${this.prompt} ${queryString}`);
    this.historyIndex = this.cmdLines.length;
    
    if(queryString=='pages'){
      this.cmdLines.push(`pages command syntax:`);
      this.pages.push("test");
      this.toTop('notes')
      this.loading = false;
      setTimeout(this.scrollTerminal, 10);
    }else{
      this.cmdLines.push(`Command not found: ${queryString}`);
      this.loading = false;
      setTimeout(this.scrollTerminal, 10);
    }
 /* this.chicagoOpenDataService.getBandos(queryString.replace(/ /g, '&')).subscribe(data => {
      this.bandos = data;
      this.cmdLines.push(`Success: ${data.length} bandos found.`);
      this.loading = false;
      setTimeout(this.scrollTerminal, 10);
    }, err => {
      this.cmdLines.push(`ERROR: ${err}`);
      this.loading = false;
      setTimeout(this.scrollTerminal, 10);
    });
  */return false;
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
