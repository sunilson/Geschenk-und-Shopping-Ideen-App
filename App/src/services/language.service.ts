import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LanguageService {

    currentLang: string;

    constructor(private translateService: TranslateService, private storage: Storage, private alertCtrl: AlertController) {

    }

    initializeLanguage() {
        this.translateService.setDefaultLang("en");
        this.translateService.use(navigator.language);

        this.storage.get("language").then(value => {
            this.currentLang = value;
            if (this.currentLang) {
                this.translateService.use(this.currentLang);
            }
        });

    }

    showLanguageAlert() {
        this.translateService.get(["select_language"]).subscribe(values => {

            let alert = this.alertCtrl.create({
                title: values["select_language"]
            });

            alert.addInput({
                type: "radio",
                label: "German",
                value: "de",
                checked: (this.currentLang === "de")
            });

            alert.addInput({
                type: "radio",
                label: "English",
                value: "en",
                checked: (this.currentLang === "en")
            });

            alert.addButton("Cancel");

            alert.addButton({
                text: "Done",
                handler: data => {
                    this.setLanguage(data);
                }
            });

            alert.present();
        });
    }

    setLanguage(language: string) {
        this.currentLang = language;
        this.storage.set("language", this.currentLang);
        this.translateService.use(this.currentLang);
    }
}