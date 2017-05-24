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

  constructor(private printService: PrintService, private storeService: StoreService) {
    this.styleClasses = {};
    this.setMinTimeToShowConfirmation(0);
   }

  ngOnInit() {
    console.log("roundedTime", this.store.aproxTime);
    console.log("havetime", this.store.storeHaveAproxTime);
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
    console.log(event);
    console.log("this", this);

    /*let storeClickedName = this.capitalizeFirstLetter(event.target.innerText);
    this.store = this.stores.filter(store => store.name === storeClickedName)[0];*/
    console.log("storeToComponent", this.store);

    if (this.store.storeHaveAproxTime) {// mostrem el component StoreInfo
      this.showStoreInfo = true;
    } 
      
    else {
      //Canviar torn per torn real
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
    console.log("showStoreInfo: ", this.showStoreInfo)
    //this.store[0].aproxTime = "3 minuts";
    //rebre la ID de la store per fer el GET i omplir el component storeInfo amb els valors retornats
		//this.name = event;
		
  }

  setMinTimeToShowConfirmation (number: Number) {
    this.minTimeToShowConfirmation = number;
  }

}
