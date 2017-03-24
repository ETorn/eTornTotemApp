import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Http } from '@angular/http';
import { Config } from '../../interfaces/config.interface';
import { ConfigService } from '../../services/config/config.service';
import { SuperService } from '../../services/super/super.service';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-totem',
  templateUrl: './totem.component.html',
  styleUrls: ['./totem.component.css']
})
export class TotemComponent implements OnInit {

  @Input()
  superId: string;

  super: any;
  superName: string;

  idsStore: [string];

  constructor(private superService: SuperService, private dataService: DataService) {
    
   }

  ngOnInit() {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['superId']) {
      
      console.log("TotemChange")
      console.log(this.superId);
      this.super = this.getSuperById(this.superId);
    }
  }

  getSuperById(superId: string): any {
    console.log("getSuper")
    console.log(superId)
      if (!superId) return;
      this.superService.getSuperById(superId).subscribe(res => {
        console.log("appComp");
        console.log(res);
        this.idsStore = res.stores;
        this.superName = res.address;
        console.log("ArrayID",this.idsStore)
      })
  }

}
