import { Component, OnInit } from '@angular/core';
import { Config } from './interfaces/config.interface';
import { SuperService } from './services/super.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SuperService]
})
export class AppComponent implements OnInit{
  title = 'app works!';
  config: Config;
  constructor(private superService: SuperService) {
    //var id = _config.get('superId');
    
    //_config.loadSuperId();
    
  }

  ngOnInit() {
      setInterval(() => {this.initConfig();}, 1000);
  }

  initConfig() {
    this.superService.getConfig().subscribe(res => {
      this.config = res;
      console.log(this.config);
    })
  }
}
