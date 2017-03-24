import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ConfigService } from '../config/config.service';
import { Config } from '../../interfaces/config.interface';
import 'rxjs/add/operator/map';

@Injectable()
export class TotemService {

  constructor(private _http: Http, private configService: ConfigService) { }

   getSuperId(config: Config) {
    console.log("getSuperId");
    console.log(config);
    const url = config.node.address + 
    '/totems/' + config.totem.identifier;
    return this._http.get(url)
          .map(res => res.json());
  }

}
