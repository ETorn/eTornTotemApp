import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges  } from '@angular/core';
import { Config } from './interfaces/config.interface';
import { DataService } from './services/data/data.service';
import { SuperService } from './services/super/super.service';
import { TotemService } from './services/totem/totem.service';
import { StoreService } from './services/store/store.service';
import { ConfigService } from './services/config/config.service';
import { CaesarService } from './services/caesar/caesar.service';
import { PrintService } from './services/print/print.service';

import { StoreInfoComponent } from './components/store-info/store-info.component';

import { Observable } from 'rxjs/Observable';

import { Packet } from 'mqtt';
import { MQTTService } from './services/mqtt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  config: Config;

  styleClasses: {};

  minTimeToShowConfirmation: Number;

  stores: any[];
 
  storesID: any[];
  superName: string;

  showStoreInfo = false;

  store: any; //storeId que es passa al component store-info al fer click en una parada

 // Stream of messages
  public messages: Observable<Packet>;

  public topic: string;

  // Array of historic message (bodies)
  public mq: Array<string> = [];

  filteredStores : any[];
  filteredStoreNames : string[];

  storeHaveAproxTime: boolean;

  constructor(private dataService: DataService, private configService: ConfigService, private totemService: TotemService,
  private superService: SuperService, private storeService: StoreService, private caesarService: CaesarService, private _mqService: MQTTService) {
    this.store = [];
    this.storeHaveAproxTime = false;
    this.stores = [];
    this.setMinTimeToShowConfirmation(0);
  }

  ngOnInit() {
    console.log("App iniciada");

    //this.setStyleClasses();

    this.configService.getConfig().subscribe(
      config => {
        this.config = config;
        this.dataService.setData(config);
        this.totemService.getSuperId(config).subscribe( // Comprovar responses if (!null)¿?
          response => {
            this.superService.getSuperById(response.superId).subscribe(
              superMrkt => {
                console.log("super", superMrkt);
                this.storesID = superMrkt.stores;
                this.superName = superMrkt.address;
                for (let i in this.storesID) {
                  this.config.subscribe.push("etorn/store/" + this.storesID[i]._id + "/#") //Afegeix una subscripció a tots els topics de cada una de les parades
                  this.storeService.getStoresById(this.storesID[i]._id).subscribe(
                    store => {
                      console.log("store", store);
                     // store.queue = 10; uncoment to test
                      this.caesarService.getStoreAverageTime(store._id).subscribe(
                        time => {

                          /*if (i == "1") 
                            store.aproxTime = 3 // Per a fer demo
                          else
                            store.aproxTime = 6; // Hardcoded!! Canviar quan rebem el temps aproximat del servidor*/
                            
                          store.aproxTime = time;

                          if (time > this.config.minAproxTime) //uncomment to test printer
                            store.storeHaveAproxTime = true;
                          else
                            store.storeHaveAproxTime = false;

                          //store.aproxTime = 10; uncoment to test

                          console.log("time",store.aproxTime);

                          this.stores.push(store);
                          this._mqService.configure(this.config);
                          this._mqService.try_connect()
                            .then(this.on_connect)
                            .catch(this.on_error); 
                        }
                      )
                    }
                  )
                }
              }
            )
          }
        )
      }
    );
  }

  storeAproxTime (index: number): boolean {
    return this.stores[index].storeHaveAproxTime;
  }

  getStyleClasses (index: number) {
    let haveAproxTime = this.storeAproxTime(index);
    
    this.styleClasses = {
      'col-sm-6': haveAproxTime,
      'col-sm-12': !haveAproxTime
    }
    return this.styleClasses;
  }

  setMinTimeToShowConfirmation (number: Number) {
    this.minTimeToShowConfirmation = number;
  }

  capitalizeFirstLetter(string) {
      let newString = string.toLowerCase();
      return newString.charAt(0).toUpperCase() + newString.slice(1);
  }

  storeMood (event) {
    this.showStoreInfo = event;
  }

  

  ngOnDestroy() {
    this._mqService.disconnect();
  }

  /** Callback on_connect to queue */
  public on_connect = () => {
    console.log("Conected");

    // Store local reference to Observable
    // for use with template ( | async )
    this.messages = this._mqService.messages;
    

    // Subscribe a function to be run on_next message
    this.messages.subscribe(this.on_next);
  }

  /** Consume a message from the _mqService */
  public on_next = (message: Packet) => {
    this.topic = this._mqService.topic;
    console.log("topicAppComponent", this.topic);

    // Store message in "historic messages" queue
    this.mq.push(message.toString() + '\n');

    console.log("messages",this.messages);
    console.log("mqMessage",this.mq);
    //console.log("turn",this.mq[0]);
    console.log("message", message);

    

    let storeIdTopic = this.topic.split('/')[2];
    let messageType = this.topic.split('/')[3];
    
    for(let i in this.stores) {
      if(storeIdTopic === this.stores[i]._id) {
       
        if (messageType === "storeTurn")
          this.stores[i].storeTurn = message;
        else if (messageType === "usersTurn")
          this.stores[i].usersTurn = message;
        else if (messageType === "queue")
          this.stores[i].queue = message;
        else if (messageType === "aproxTime") {
          this.stores[i].aproxTime = message;

           this.stores[i].storeHaveAproxTime = Number(message) > this.config.minAproxTime ? true : false;
        }
        console.log("storeTurn", this.stores[i].storeTurn);
        console.log("usersTurn", this.stores[i].usersTurn);
        console.log("queue", this.stores[i].queue);
        console.log("aproxTime", this.stores[i].aproxTime);
      }
    }
  }

  public on_error = () => {
    console.error('Ooops, error in component');
  }
}
