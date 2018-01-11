import { TranslateService } from '@ngx-translate/core';
import { RefreshService } from './refresh.service';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AlertController, ToastController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SortingService {

    public region = {
        value: "de",
        text: "Germany"
    };

    public sex = {
        value: "u",
        text: "Unisex"
    };

    public seller = {
        value: "all",
        text: "All"
    };

    public category = {
        value: "",
        text: "neueste_produkte",
    }

    constructor(private translateService: TranslateService, private storage: Storage, private refreshService: RefreshService, private http: Http, private alertCtrl: AlertController, private toastCtrl: ToastController, private loadingCtrl: LoadingController) {

    }

    initializeData() {
        return new Promise((resolve, reject) => {

            let p1 = this.storage.get("region");
            let p2 = this.storage.get("sex");
            let p3 = this.storage.get("seller");
            let p4 = this.storage.get("category");

            return Promise.all([p1, p2, p3, p4]).then(values => {
                if (values[0]) {
                    this.region = values[0];
                }
                if (values[1]) {
                    this.sex = values[1];
                }
                if (values[2]) {
                    this.seller = values[2];
                }
                if (values[3]) {
                    this.category = values[3];
                }
                resolve();
            });
        });
    }

    setRegion(region) {
        this.region = region;
        this.storage.set("region", region);
    }

    setSex(sex) {
        this.sex = sex;
        this.storage.set("sex", sex);
    }

    setSeller(seller) {
        this.seller = seller;
        this.storage.set("seller", seller);
        console.log(this.seller);
    }

    setCategory(category) {
        this.category = category;
        this.storage.set("category", category);
    }

    showSellerDialog() {
        let loader = this.loadingCtrl.create({
            content: "Loading data..."
        });
        loader.present();
        this.getSellers().subscribe((data) => {
            loader.dismiss();
            let alert = this.alertCtrl.create({
                title: "Choose a seller",
            });
            let checked = ("all" == this.seller.value);
            alert.addInput({
                type: "radio",
                label: "All",
                value: "all" + "," + "All",
                checked: checked
            });
            for (let i = 0; i < data.length; i++) {
                checked = (data[i].id == this.seller.value);
                alert.addInput({
                    type: "radio",
                    label: data[i].name,
                    value: data[i].id + "," + data[i].name,
                    checked: checked
                });
            }
            alert.addButton("Cancel");
            alert.addButton({
                text: "Done",
                handler: data => {
                    var values = data.split(",");
                    this.setSeller({
                        value: values[0],
                        text: values[1]
                    });
                    this.refreshService.refresh(true);
                }
            });
            alert.present();
        }, error => this.toastCtrl.create({
            message: error,
            duration: 1000
        }));
    }

    showRegionDialog() {
        let loader = this.loadingCtrl.create({
            content: "Loading data..."
        });
        loader.present();
        this.translateService.get("choose_region").subscribe(value => {
            this.getRegions().subscribe((data) => {
                loader.dismiss();
                let alert = this.alertCtrl.create({
                    title: value,
                });
                for (let i = 0; i < data.length; i++) {
                    let checked = (data[i].shortcode === this.region.value);
                    alert.addInput({
                        type: "radio",
                        label: data[i].name,
                        value: data[i].shortcode + "," + data[i].name,
                        checked: checked
                    });
                }
                alert.addButton("Cancel");
                alert.addButton({
                    text: "Done",
                    handler: data => {
                        var values = data.split(",");
                        this.setRegion({
                            value: values[0],
                            text: values[1]
                        });
                        this.refreshService.refresh(true);
                    }
                });
                alert.present();
            }, error => this.toastCtrl.create({
                message: error,
                duration: 1000
            }));
        });
    }

    showSexDialog() {
        this.translateService.get(["choose_sex", "male", "female", "egal"]).subscribe(values => {
            let alert = this.alertCtrl.create({
                title: values["choose_sex"]
            });

            alert.addInput({
                type: "radio",
                label: values["male"],
                value: "m, Male",
                checked: (this.sex.value === "m")
            });

            alert.addInput({
                type: "radio",
                label: values["female"],
                value: "f, Female",
                checked: (this.sex.value === "f")
            });

            alert.addInput({
                type: "radio",
                label: values["egal"],
                value: "u, Unisex",
                checked: (this.sex.value === "u")
            });

            alert.addButton("Cancel");
            alert.addButton({
                text: "Done",
                handler: data => {
                    var values = data.split(",");
                    this.setSex({ value: values[0], text: values[1] });
                    this.refreshService.refresh(true);
                }
            });
            setTimeout(() => {
                alert.present();
            }, 100);
        });
    }

    getRegions() {
        let url = "https://shopping-ideas-server.herokuapp.com/api/region";
        return this.http.get(url).map(this.extractData).catch(this.handleError);
    }

    getSellers() {
        let url = "https://shopping-ideas-server.herokuapp.com/api/seller";
        return this.http.get(url).map(this.extractData).catch(this.handleError);
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
}