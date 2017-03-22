import { Component, OnInit } from '@angular/core';
import { Config } from './config/config'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [Config]
})
export class AppComponent implements OnInit{
  title = 'app works!';
  mec: Object;
  constructor(private _config: Config) {
    //var id = _config.get('superId');
    
    _config.loadSuperId();
    
  }

  ngOnInit() {
      setInterval(() => {console.log(this.mec);}, 1000);
  }
}
