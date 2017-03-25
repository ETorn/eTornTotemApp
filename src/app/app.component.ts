import { Component, OnInit } from '@angular/core';
import { Config } from './interfaces/config.interface';
import { DataService } from './services/data/data.service';
import { SuperService } from './services/super/super.service';
import { TotemService } from './services/totem/totem.service';
import { StoreService } from './services/store/store.service';
import { ConfigService } from './services/config/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  config: Config;

  stores: any[];
 
  storesID: string[];
  superName: string;

  constructor(private dataService: DataService, private configService: ConfigService, private totemService: TotemService,
  private superService: SuperService, private storeService: StoreService) {
    this.stores = [{}];
  }

  ngOnInit() {
    console.log("App iniciada")
    this.configService.getConfig().subscribe(
      config => {
        this.dataService.setData(config);
        this.totemService.getSuperId(config).subscribe(
          response => {
            this.superService.getSuperById(response.superId).subscribe(
              superMrkt => {
                console.log("super", superMrkt);
                this.storesID = superMrkt.stores;
                this.superName = superMrkt.address;
                for (let i in this.storesID) {
                  this.storeService.getStoresById(this.storesID[i]).subscribe(
                    store => {
                      console.log("store", store);
                      this.stores.push(store);
                    }
                  )
                }
              }
            )
          }
        )
      }
    );
    //this.initConfig();
      //setInterval(() => {this.initConfig();}, 1000);
  }

  
}
