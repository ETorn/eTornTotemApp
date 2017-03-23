import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
 export class Config {

   /* public _config: any
    public superId: string
    constructor(private http: Http) {
        this._config = {};
    }

    loadSuperId() {
        this.http.get('src/app/config/config.json')
        .map((res:Response) => res.json())
        .subscribe(
            data => {
                this._config = data;
                console.log(this._config);
                //this.superId = data.totem.superId;
            },
            err => console.error(err),
            () => {return this._config}  
        );
    }

    getSuperId() {
        return this._config.totem.superId;
    }*/

    /*load () {
        console.log("load cridat");
        return new Promise((resolve, reject) =>{
            this.http.get('src/app/config/config.json')
            .map(res => res.json())
            .catch((error: any): any => {
                console.log('Configuration file could not be read');
                resolve(true);
                return Observable.throw(error.json().error || 'Server error');
            })
            .subscribe((data: any) => {
                this._config = data;
                console.log("data" + data);
                this.superId = data.totem.superId;
            });
        });*/
            
       
        
        /* return new Promise((resolve, reject) => {

            this.http.get('src/app/config/config.json')
            .map(res => res.json())
            .subscribe((data) => {
                console.log("data" + data);
                this._config = data;
                resolve(true);
            });
        });*/
    }

    /*public getSuperId(): string {
        //return this.superId;
        return this._config.superId;
    }

    get(key: any) {
        return this._config[key];
    }*/
