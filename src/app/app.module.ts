import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { DataService } from './services/data/data.service';
import { SuperService } from './services/super/super.service';
import { ConfigService } from './services/config/config.service';
import { StoreService } from './services/store/store.service';
import { TotemService } from './services/totem/totem.service';
import { MQTTService } from './services/mqtt/mqtt.service';
import { CaesarService } from './services/caesar/caesar.service';
import { PrintService } from './services/print/print.service';

import { AppComponent } from './app.component';
import { ModalComponent } from './components/modal/modal.component';
import { StoreInfoComponent } from './components/store-info/store-info.component';
import { StoreComponent } from './components/store/store.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    AppComponent,
    StoreInfoComponent,
    StoreComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot()
  ],
  providers: [DataService, SuperService, ConfigService, StoreService, TotemService, MQTTService, CaesarService, PrintService],
  bootstrap: [AppComponent]
})
export class AppModule { }
