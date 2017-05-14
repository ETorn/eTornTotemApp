import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { PrintService } from '../../services/print/print.service';
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

  public visible = false;
  private visibleAnimate = false;

  constructor(private printService: PrintService) {this.loaded = false;}

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

   public show(): void {
     console.log("ajwhdjkwad");
     
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true, 100);
  }

  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
  }

  public onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }

}
