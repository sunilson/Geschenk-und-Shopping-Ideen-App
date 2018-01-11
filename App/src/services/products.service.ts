import { SortingService } from './sorting.service';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injectable, Inject } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ProductsService {

    private url = "https://shopping-ideas-server.herokuapp.com/api/product";
    constructor(private http: Http, private sortingService: SortingService) {

    }

    getProducts(index: number) {
        return this.http.get(this.url + "/" + this.sortingService.region.value + "?index=" + index + "&sex=" + this.sortingService.sex.value + "&seller=" + this.sortingService.seller.value + "&category=" + this.sortingService.category.value).map(this.extractData).catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError(error: Response | any) {
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
}