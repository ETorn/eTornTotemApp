import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges  } from '@angular/core';
import { Config } from './interfaces/config.interface';
import { DataService } from './services/data/data.service';
import { SuperService } from './services/super/super.service';
import { TotemService } from './services/totem/totem.service';
import { StoreService } from './services/store/store.service';
import { ConfigService } from './services/config/config.service';

import { StoreInfoComponent } from './components/store-info/store-info.component';

import { customTransition } from './animations/transition.animation';

import { Observable } from 'rxjs/Observable';

import { Packet } from 'mqtt';
import { MQTTService } from './services/mqtt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [customTransition()]
})
export class AppComponent{
  config: Config;

  stores: any[];
 
  storesID: string[];
  superName: string;

  showStoreInfo = false;

  store: any; //storeId que es passa al component store-info al fer click en una parada

 // Stream of messages
  public messages: Observable<Packet>;

  public topic: string;

  // Array of historic message (bodies)
  public mq: Array<string> = [];

  private loaded: boolean;

  constructor(private dataService: DataService, private configService: ConfigService, private totemService: TotemService,
  private superService: SuperService, private storeService: StoreService, private _mqService: MQTTService) {
    this.store = {};
    this.stores = [{}];
    this.loaded = false;
  }

  storeInfoMood(event) {
    this.showStoreInfo = event;
    this.store.name = "Carniceria";
    this.store.storeTurn = "1";
    this.store.usersTurn = "1";
    //rebre la ID de la store per fer el GET i omplir el component storeInfo amb els valors retornats
		//this.name = event;
		console.log(event);
  }

  ngOnInit() {
    console.log("App iniciada")
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
                  this.config.subscribe.push("etorn/store/" + this.storesID[i] + "/#") //Afegeix una subscripció a tots els topics de cada una de les parades
                  this.storeService.getStoresById(this.storesID[i]).subscribe(
                    store => {
                      console.log("store", store);
                      this.stores.push(store);
                      this._mqService.configure(this.config);
                      this._mqService.try_connect()
                         .then(this.on_connect)
                         .catch(this.on_error); 
                    }
                  )
                }
              }
            )
          }
        )
      }
    );
    //this.initConfig();
      //setInterval(() => {this.initConfig();}, 1000);
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
    console.log("turn",this.mq[0]);
    console.log("message", message);

    let storeIdTopic = this.topic.split('/')[2];
    let messageType = this.topic.split('/')[3];
    
    for(let i in this.stores) {
      if(storeIdTopic === this.stores[i]._id) {
        if (messageType === "storeTurn")
          this.stores[i].storeTurn = message;
        else if (messageType === "usersTurn")
          this.stores[i].usersTurn = message;
        /*else if (messageType === "queue")
        Agafar cua si la afegim al model Store*/
      }
    }
  }

  public on_error = () => {
    console.error('Ooops, error in component');
  }
}
