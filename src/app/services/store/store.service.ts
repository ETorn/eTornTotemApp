import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Config } from '../../interfaces/config.interface';
import { DataService } from '../data/data.service';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class StoreService {
  private config: Config;

  constructor(private dataService: DataService, private _http: Http) {
    
  }

  getStoresById(storesId: string) {
      this.config = this.dataService.getValue();
      console.log("StoresByIDService");
      console.log("storesId", storesId);
      const url = this.config.node.address + '/stores/' + storesId;
      return this._http.get(url)
            .map(res => res.json());
  }

  requestTurn(storeId: string) {
      this.config = this.dataService.getValue();
      console.log("RequestTurn Service");
      const url = this.config.node.address + '/stores/' + storeId + '/users/' + this.config.totem._id;
      return this._http.put(url,null)
            .map(res => res.json());
  }
}
