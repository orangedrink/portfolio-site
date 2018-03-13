import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NoteComponent } from './note/note.component';
import { BandoComponent } from '../bandos/bando/bando.component';
import { ChicagoOpenDataService } from '../chicago-open-data.service';
import { NotesService } from '../notes.service';
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
  providers:[ChicagoOpenDataService, NotesService]
})
export class DesktopComponent implements OnInit {
  notesData = [];
  bandoData = [];
  cmdLines = [];
  inputCommand: string;
  filename: string;
  loading: boolean = false;
  prompt: string = "C:\\Users\\Dave>";
  historyIndex: number = 0;
  notes: XpWindow;
  terminal: XpWindow;

  constructor(private activatedRoute: ActivatedRoute, private chicagoOpenDataService: ChicagoOpenDataService, private notesService: NotesService) {
    this.notes = new XpWindow();
    this.notes.closed = true;
    this.terminal = new XpWindow();
    //this.terminal.closed=true;
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
      this.filename = null;
      this.notesData=[];
    }
    e.stopPropagation();
  }
  minimizeWindow(e, target){
    if(target=='terminal'){
      this.terminal.closed=false;
      this.terminal.maximized = false;
      this.terminal.minimized=!this.terminal.minimized;
      this.terminal.onTop=!this.terminal.minimized;
      this.notes.onTop==this.terminal.minimized ? true : false;
    }else{
      this.notes.closed=false;
      this.notes.maximized = false;
      this.notes.minimized=!this.notes.minimized;
      this.notes.onTop=!this.notes.minimized;
      this.terminal.onTop==this.notes.minimized ? true : false;
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
    this.loading = true;
    this.cmdLines.push(`${this.prompt} ${queryString}`);
    this.historyIndex = this.cmdLines.length;
    let commandLine = queryString.split(' ');
    if(commandLine[0]=='about'||commandLine[0]=='portfolio'||commandLine[0]=='games'){
      this.cmdLines.push(`${commandLine[0]} command syntax:`);
      console.log(this.notesService);
      this.notesService.getNotes(`category=${commandLine[0]}`).subscribe(data => {
        this.notesData = data;
        this.cmdLines.push(`Success: ${data.length} entries found for '${commandLine[0]}'.`);
        this.loading = false;
        this.filename=`${commandLine[0]}`;
        this.toTop('notes')
      }, err => {
        this.cmdLines.push(`ERROR: ${err}`);
        this.loading = false;
      });
      this.filename = commandLine[0];
      this.notes.minimized=false;
      this.loading = false;
      this.toTop('notes')
    }else if(commandLine[0]=='notepad.exe'||commandLine[0]=='notepad'){
      this.cmdLines.push(`Starting notepad.exe`);
      this.notes.minimized=false;
      this.toTop('notes')
    }else if(commandLine[0]=='bandohacker.exe'||commandLine[0]=='bandohacker'||commandLine[0]=='bandos'){
      this.chicagoOpenDataService.getBandos(commandLine[1]?commandLine[1]:'$limit=30').subscribe(data => {
        this.bandoData = data;
        this.cmdLines.push(`Success: ${data.length} bandos found.`);
        this.loading = false;
        this.filename="bandos"
        this.toTop('notes')
      }, err => {
        this.cmdLines.push(`ERROR: ${err}`);
        this.loading = false;
      });
    }else if(commandLine[0]=='cd'){
      this.prompt = `C:\\${commandLine[1]}>`;
      this.loading = false;
    }else if(commandLine[0]=='help'){
      this.cmdLines.push(`Available commands:`);
      this.cmdLines.push(`'about'     - Shows information about me, David Franks.`);
      this.cmdLines.push(`'portfolio' - Shows information about my professional portfolio.`);
      this.cmdLines.push(`'games'     - Shows information about the games that I've created.`);
      this.cmdLines.push(`'help'      - This help text.`);
      this.loading = false;
    }else if(commandLine[0]=='dir'){
      this.cmdLines.push(`05/11/2018 05:07PM &lt;DIR&gt; .`);
      this.cmdLines.push(`05/11/2018 05:07PM &lt;DIR&gt ..`);
      this.cmdLines.push(`05/11/2018 05:07PM 2,312 'about.lnk'`);
      this.cmdLines.push(`05/13/2018 07:11PM 1,091 'portfolio.lnk'`);
      this.cmdLines.push(`05/13/2018 07:13PM 2,101 'games.lnk'`);
      this.cmdLines.push(`03/23/2018 03:26PM 889&nbsp;&nbsp; 'help.lnk'`);
      this.loading = false;
      }else{
      this.cmdLines.push(`Bad command or filename: ${commandLine[0]}`);
      this.loading = false;
      }
    setTimeout(this.scrollTerminal, 10);
    return false;
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
