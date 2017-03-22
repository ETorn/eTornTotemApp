import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Config } from '../config/config'
import 'rxjs/add/operator/map';


@Injectable()
export class SuperService {

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
