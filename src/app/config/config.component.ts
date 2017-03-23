import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Http } from '@angular/http';
import { Config } from '../interfaces/config.interface';
import { ConfigService } from '../services/config.service';
import { SuperService } from '../services/super.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent  implements OnInit, OnChanges {
  

  @Input()
  data: Config;

  super: any;

  constructor(private superService: SuperService) { }

  ngOnInit() {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      console.log("ngChanges")
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
      })
  }
}
