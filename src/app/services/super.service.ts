import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ConfigService } from './config.service';
import { Config } from '../interfaces/config.interface';
import 'rxjs/add/operator/map';


@Injectable()
export class SuperService{

  constructor(private _http: Http, private configService: ConfigService ) { 
    /*this.configService.getConfig().subscribe(config => {
      this.config = config;
    })*/
    /*this.getConfig().subscribe(config => {
      this.config = config;
      console.log("config Arrives")
      console.log(config)
    })*/
    
  }

  /*ngOnInit() {
    this.getConfig()
        .subscribe(x => this.config = x);
  }*/

  getSuperById(config: Config) {
    console.log("SuperByidDD");
    console.log(config);
    //console.log(this.config);
    const url = config.node.address + 
    '/supers/' + config.totem.superId;
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
