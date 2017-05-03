import { Injectable } from '@angular/core';
import { Config } from '../../interfaces/config.interface';
import { DataService } from '../data/data.service';
import { Http } from '@angular/http';

@Injectable()
export class PrintService {

  private config: Config;

  constructor(private dataService: DataService, private _http: Http) { }

  printTicket(turn: string) {
    this.config = this.dataService.getValue();
    console.log("PrintService");
    console.log("Turn: ", turn);
    const url = this.config.angularNode.address + '/print/' + turn;
      return this._http.get(url)
            .map(res => res.json());
  }

}
