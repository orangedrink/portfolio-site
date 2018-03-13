import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {NoteComponent} from './note/note.component';
import {ControlValueAccessor} from '@angular/forms';
  
export class XpWindow {
    public onTop:boolean;
    public closed:boolean;
    public minimized:boolean;
    public maximized:boolean;
}
@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.css'],
})
export class DesktopComponent implements OnInit {
  notesData = [];
  cmdLines = [];
  inputCommand: string;
  loading: boolean = false;
  prompt: string = "C:\\Users\\Dave\\>";
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
    if(target=='terminal'){
      this.terminal.closed=true;
      this.terminal.minimized=false;
      this.terminal.maximized=false;
      this.cmdLines=[];
    }else{
      this.notes.closed=true;
      this.notes.minimized=false;
      this.notes.maximized=false;
      this.notesData=[];
    }
    e.stopPropagation();
  }
  minimizeWindow(e, target){
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
  }
  maximizeWindow(e, target){
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
  }
  keyHandler(event) {
    //console.log(event, event.keyCode, event.keyIdentifier);
  } 
  
  toTop(target){
    console.log(target);
    if(target==='terminal'){
      this.terminal.closed=false;
      this.terminal.onTop=true;
      this.notes.onTop=false;
    }else{
      this.notes.closed=false;
      this.terminal.onTop=false;
      this.notes.onTop=true;
    }
  }


  command(queryString: string = '') {
    this.toTop('terminal');
    this.terminal.minimized=false;
    this.inputCommand = '';
    //this.pages = [];
    this.loading = true;
    this.cmdLines.push(`${this.prompt} ${queryString}`);
    this.historyIndex = this.cmdLines.length;
    
    if(queryString=='about'||queryString=='portfolio'||queryString=='games'){
      this.cmdLines.push(`${queryString} command syntax:`);
      this.notesData.push(`${queryString} section coming soon`);
      this.toTop('notes')
    }else if(queryString=='notepad.exe'){
      this.cmdLines.push(`Starting notepad.exe`);
      this.notes.minimized=false;
      this.toTop('notes')
    }else if(queryString=='secret'){
        this.cmdLines.push(`DIS THE SEEKRET COMMAND`);
        this.notesData.push("SEEKRET");
        this.notesData.push("COMMAD");
        this.toTop('notes')
    }else if(queryString=='help'){
      this.cmdLines.push(`Available commands:`);
      this.cmdLines.push(`about`);
      this.cmdLines.push(`portfolio`);
      this.cmdLines.push(`games`);
      this.cmdLines.push(`help`);
    }else{
      this.cmdLines.push(`Command not found: ${queryString}`);
    }
    this.loading = false;
    setTimeout(this.scrollTerminal, 10);

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
