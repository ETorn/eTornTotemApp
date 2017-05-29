import { Component, OnInit, Output, Input, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { PrintService } from '../../services/print/print.service';
import { StoreService } from '../../services/store/store.service';
import { DataService } from '../../services/data/data.service';
import { Config } from '../../interfaces/config.interface';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  
  @Input()
  store: any;

  styleClasses: any;
  showStoreInfo = false;
  minTimeToShowConfirmation: Number;

  constructor(private printService: PrintService, private storeService: StoreService, private dataService: DataService) {
    this.styleClasses = {};
   }

  ngOnInit() {
    this.minTimeToShowConfirmation = this.dataService.getValue().minTimeToShowConfirmation;
  }

  storeAproxTime (): boolean {
    return this.store.storeHaveAproxTime;
  }

  getStyleClasses () {
    let haveAproxTime = this.storeAproxTime();
    
    this.styleClasses = {
      'col-sm-6': haveAproxTime,
      'col-sm-12': !haveAproxTime
    }
    return this.styleClasses;
  }

  storeMood (event) {
    this.showStoreInfo = event;
  }

  infoIsOpened () {
    return this.showStoreInfo;
  }

  roundAproxTime (time: number) {
    return Math.round(time);
  }

  storeInfoOnClick(event) {

    if (this.store.storeHaveAproxTime) {// mostrem el component StoreInfo
      this.showStoreInfo = true;
    } 
      
    else {
      console.log("onClickPrint");
      this.printService.printTicket(this.store.usersTurn).subscribe(
        message => {
          console.log("print message", message);
        }
      );

      //peticio addUser al servidor
      console.log("RequestTurn");
      this.storeService.requestTurn(this.store._id).subscribe(
        message => {
          console.log("RequestTurn message: ", message);
        }
      );
    }
  }

}
