import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


@Injectable()
export class ConfigService {

  constructor(private _http: Http) { }

  getConfig() {
      const url = 'src/app/config/config.json';
      return this._http.get(url)
            .map(res => res.json());
  }
}
