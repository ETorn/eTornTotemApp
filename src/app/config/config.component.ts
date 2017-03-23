import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Http } from '@angular/http';
import { Config } from '../interfaces/config.interface';
import { ConfigService } from '../services/config.service';
import { SuperService } from '../services/super.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent  implements OnInit, OnChanges {
  

  @Input()
  data: Config;

  super: any;
  superName: string;

  idsStore: [string];

  constructor(private superService: SuperService, private dataService: DataService) { }

  ngOnInit() {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.dataService.setData(this.data); // Seteja el servei Global Data
      console.log("ConfigChange")
      console.log(this.data);
      this.super = this.getSuperById(this.data);
    }
  }

  getSuperById(data: Config): any {
    console.log("getSuper")
    console.log(data)
      if (!data) return;
      this.superService.getSuperById(data).subscribe(res => {
        console.log("appComp");
        console.log(res);
        this.idsStore = res.stores;
        this.superName = res.address;
        console.log("ArrayID",this.idsStore)
      })
  }
}
