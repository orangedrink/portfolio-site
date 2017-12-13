import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bando',
  templateUrl: './bando.component.html',
  styleUrls: ['./bando.component.css']
})
export class BandoComponent implements OnInit {
  @Input() bando: any;
  constructor() { }

  ngOnInit() {
  }

}
