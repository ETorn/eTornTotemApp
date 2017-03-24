import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Http } from '@angular/http';
import { Config } from '../../interfaces/config.interface';
import { ConfigService } from '../../services/config/config.service';
import { SuperService } from '../../services/super/super.service';
import { DataService } from '../../services/data/data.service';
import { TotemService } from '../../services/totem/totem.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent  implements OnInit, OnChanges {
  

  @Input()
  data: Config;

  superId: string;
  
  constructor(private totemService: TotemService, private dataService: DataService) { }

  ngOnInit() {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.dataService.setData(this.data); // Seteja el servei Global Data per a tenir acces a la IP de node
      console.log("ConfigChange")
      console.log(this.data);
      this.superId = this.getSuperId(this.data);
    }
  }

   getSuperId(data: Config): string {
    console.log("getSuperID")
    console.log(data)
      if (!data) return;
      this.totemService.getSuperId(data).subscribe(res => {
        console.log("appComp");
        console.log(res.superId);
        this.superId = res.superId;
        console.log("SuperID",this.superId)
      })
  }

  
}
