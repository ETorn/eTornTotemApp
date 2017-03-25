import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { DataService } from './services/data/data.service';
import { SuperService } from './services/super/super.service';
import { ConfigService } from './services/config/config.service';
import { StoreService } from './services/store/store.service';
import { TotemService } from './services/totem/totem.service';
//import { MqttService } from './services/mqtt/mqtt.service';

import { AppComponent } from './app.component';

import { MaterialModule } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule
  ],
  providers: [DataService, SuperService, ConfigService, StoreService, TotemService],
  bootstrap: [AppComponent]
})
export class AppModule { }
