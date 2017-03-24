import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ConfigService } from '../config/config.service';
import { DataService } from '../data/data.service';
import { Config } from '../../interfaces/config.interface';
import 'rxjs/add/operator/map';


@Injectable()
export class SuperService{
  nodeUrl: string;
  constructor(private _http: Http, private dataService: DataService ) {}

  getSuperById(superId: string) {
    console.log("SuperByidDD");
    console.log(superId);
    const url =  this.dataService.getValue().node.address +
    '/supers/' + superId;
    console.log("url", url);
    return this._http.get(url)
          .map(res => res.json());
  }

}
