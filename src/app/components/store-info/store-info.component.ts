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
  store: any;

  @Output()
  change = new EventEmitter();

  loaded: boolean;

  constructor() {this.loaded = false;}

  ngOnInit() {
    console.log(this.store);
    window.setTimeout(() => this.loaded = true);
  }
  
  toggleStoreInfo(event) {
    this.showStoreInfo = false;
    this.change.emit(this.showStoreInfo);
  }

}
