import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { PrintService } from '../../services/print/print.service';
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

  constructor(private printService: PrintService) {
    this.styleClasses = {};
    this.setMinTimeToShowConfirmation(0);
   }

  ngOnInit() {
    this.store.aproxTime = this.roundAproxTime(this.store.aproxTime);
  }

  roundAproxTime (time: number) {
    return Math.round(time);
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
      this.printService.printTicket("5").subscribe(
        message => {
          console.log("message", message);
        }
      )
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
