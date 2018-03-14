import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class NotesService {

  constructor(private http: Http) { }
  
  getNotes(params) {
    //return this.http.get('')
    return this.http.get(`https://infinite-refuge-55973.herokuapp.com/api/notes?${params}`)
      .map((res:Response) => res.json());
  }
}
