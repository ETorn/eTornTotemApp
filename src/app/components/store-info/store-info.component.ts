import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-store-info',
  templateUrl: './store-info.component.html',
  styleUrls: ['./store-info.component.css'],
})
export class StoreInfoComponent implements OnInit {

  @Input()
  showStoreInfo: boolean;

  @Input()
  storeId: string;

  @Output()
  change: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  

  toggleStoreInfo(event) {
    this.showStoreInfo = false;
    this.change.emit(this.showStoreInfo);
  }

}
