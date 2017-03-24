import { Component, OnInit } from '@angular/core';
import { Config } from './interfaces/config.interface';
import { SuperService } from './services/super/super.service';
import { ConfigService } from './services/config/config.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  config: Config;

 

  constructor(private configService: ConfigService) {
    //var id = _config.get('superId');
    
    //_config.loadSuperId();
    
  }

  ngOnInit() {
    console.log("configInit")
    this.configService.getConfig().subscribe(
      res => this.config = res
    );
    //this.initConfig();
      //setInterval(() => {this.initConfig();}, 1000);
  }

  

  /*initConfig() {
    this.superService.getSuperById().subscribe(res => {
      if (res != null)
        this.info = res;
      console.log("res");
      console.log(res);
    })
  }*/

  
}
