import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AlertController, ToastController, LoadingController } from 'ionic-angular';
import { Category } from './../models/category';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DataService {

    public categories: Category[] = [
        new Category("computer", "Computer", "laptop"),
        new Category("crafting", "Crafting", "hand"),
        new Category("gadgets", "Gadgets", "settings"),
        new Category("gaming", "Gaming", "game-controller-a"),
        new Category("living", "Home and living", "home"),
        new Category("sport", "Sport", "bicycle"),
        new Category("geburtstag", "Geburtstag", "calendar"),
        new Category("toys", "Toys", "happy")
    ];

    constructor(private http: Http) {

    }

    /*
        refreshData() {
            
            //Load fresh categories
            let url = "http://localhost:3000/api/category";
    
            this.http.get(url).map(this.extractData).catch(this.handleError).subscribe((data) => {
                console.log(data);
                this.categories = [];
                for (let i = 0; i < data.length; i++) {
                    this.categories.push(new Category(data[i].name, data[i].icon));
                }
            }), (error) => {
    
            };
    
            //Load fresh regions
    
            //Load fresh sellers
        }
    
        extractData(res: Response) {
            let body = res.json();
            return body || {};
        }
    
        handleError(error: Response | any) {
            let message: string;
    
            if (error instanceof Response) {
                const body = error.json() || '';
                const err = body.error || JSON.stringify(body);
                message = `${error.status} - ${error.statusText || ''} ${err}`;
            } else {
                message = error.message ? error.message : error.toString();
            }
    
            console.error(message);
            return Observable.throw(message);
        }
        */
}