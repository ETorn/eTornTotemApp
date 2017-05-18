import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { PrintService } from '../../services/print/print.service';
import { StoreService } from '../../services/store/store.service';
@Component({
  selector: 'app-store-info',
  templateUrl: './store-info.component.html',
  styleUrls: ['./store-info.component.css'],
})
export class StoreInfoComponent implements OnInit {

  @Input()
  showStoreInfo: boolean;

  @Input()
  store: any;

  @Output()
  change = new EventEmitter();

  loaded: boolean;

  constructor(private printService: PrintService, private storeService: StoreService) {this.loaded = false;}

  ngOnInit() {
    console.log(this.store);
    window.setTimeout(() => this.loaded = true);
  }
  
  toggleStoreInfo(event) {
    this.showStoreInfo = false;
    this.change.emit(this.showStoreInfo);
    
  }

  printTicket() {
    //Canviar torn per torn real
    console.log("onClickPrint");
    this.printService.printTicket("5").subscribe(
      message => {
        console.log("message", message);
      }
    )
    this.showStoreInfo = false;
    this.change.emit(this.showStoreInfo);
  }

  requestTurn() {
    //peticio addUser al servidor
      console.log("RequestTurn");
      this.storeService.requestTurn(this.store._id).subscribe(
        message => {
          console.log("RequestTurn message: ", message);
        }
      );

    this.printTicket();
  }

  public onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('backgroundStore')) {
      this.toggleStoreInfo(event);
    }
  }

}
