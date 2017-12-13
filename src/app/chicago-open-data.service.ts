import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ChicagoOpenDataService {

  constructor (
    private http: Http
  ) {}

  
  getBandos(params) {
    return this.http.get(`https://data.cityofchicago.org/resource/yama-9had.json?${params}`)
    .map((res:Response) => res.json());
  }
}
