import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { DataService } from './services/data.service';
import { SuperService } from './services/super.service';
import { ConfigService } from './services/config.service';
import { StoreService } from './services/store.service';

import { AppComponent } from './app.component';
import { ConfigComponent } from './config/config.component';
import { StoresComponent } from './stores/stores.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfigComponent,
    StoresComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [DataService, SuperService, ConfigService, StoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
