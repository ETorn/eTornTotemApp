import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { StoreService } from '../../services/store/store.service';
@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent implements OnInit {

  @Input()
  ids: string[];

  stores: any[];

  constructor(private storeService: StoreService) {
    this.stores = [{}];
   }

  ngOnInit() {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['ids']) {
      console.log("OnChangeStoreID");
      for (let i in this.ids) {
        this.getStoreById(this.ids[i]);
      }
      if (this.stores != null) {
        console.log("storesLength", this.stores.length)
      }
    }
  }

  getStoreById(storesId: string): any {
    console.log("getStores")
    console.log(storesId)
      if (!storesId) return;
      
      this.storeService.getStoresById(storesId).subscribe(res => {
        this.stores.push(res);
      })
  }

}
