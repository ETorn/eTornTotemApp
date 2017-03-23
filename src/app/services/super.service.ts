import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Config } from '../interfaces/config.interface';
import 'rxjs/add/operator/map';


@Injectable()
export class SuperService{

  config: Config;

  constructor(private _http: Http) { }

  /*ngOnInit() {
    this.getConfig()
        .subscribe(x => this.config = x);
  }*/

  getConfig() {
    const url = 'src/app/config/config.json';
    return this._http.get(url)
          .map(res => res.json());
  }
  /*superId: string;
  config: Config;

  constructor(private http: Http) {
      this.superId = this.config.getSuperId();
     // this.config = new Config(this.http);
   }*/
  
  /*getSuperId() {
    return this.http.get("../../config.json")
    .map(res => res.json().totem.superId)
  }*/

  // Get all supers from the Server
 /* getSuperById(super_id: string) {
    return this.http.get(/supers/' + )
    .map(res => res.json());
  }*/
}
