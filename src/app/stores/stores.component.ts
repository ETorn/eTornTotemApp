import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { StoreService } from '../services/store.service';
@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent implements OnInit {

  @Input()
  ids: [string];

  stores: [any];

  constructor(private storeService: StoreService) {
    this.stores = [{}];
   }

  ngOnInit() {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("EEEE")
    if (changes['ids']) {
      console.log("OnChangeStoreID");
      console.log(this.ids);
      for (let i in this.ids) {
        console.log(this.ids[i])
        this.stores.push(this.getStoresById(this.ids[i]));
      }
      /*console.log("StoreNgChanges")
      console.log(this.ids);
      this.stores = [this.ids.length];
      console.log(this.stores)
      for (let i in this.ids) {
        //console.log(this.storesID[i])
        this.stores.push(this.getStoresById(this.ids[i]));
      }*/
    }
  }

  getStoresById(storesId: string): any { //Canviar per retornar array de stores
    console.log("getStores")
    console.log(storesId)
      if (!storesId) return;
      
      this.storeService.getStoresById(storesId).subscribe(res => {
        console.log(res);
      })
  }

}
