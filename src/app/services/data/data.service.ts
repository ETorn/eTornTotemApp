import { Injectable } from '@angular/core';
import { Config } from '../../interfaces/config.interface';
@Injectable()
export class DataService {
  private data: Config;

  constructor() { }

    setData(val) {
        this.data = val;
    }

    getValue() {
        return this.data;
    }
}
