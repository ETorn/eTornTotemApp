import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import { Http } from '@angular/http';
import { Config } from '../../interfaces/config.interface';
import { DataService } from '../data/data.service';

@Injectable()
export class CaesarService {

  private config: Config;

  constructor(private dataService: DataService, private _http: Http) { }

  getStoreAverageTime(storeId: string) {
    this.config = this.dataService.getValue();
    console.log("CaesarService");
    const url = this.config.caesar.address + '/averageTime/' + storeId;
      return this._http.get(url)
            .map(res => res.json());
  }

}
