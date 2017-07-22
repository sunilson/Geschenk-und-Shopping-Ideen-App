import { LanguageService } from './../services/language.service';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { RefreshService } from './../services/refresh.service';
import { SortingService } from './../services/sorting.service';
import { Category } from './../models/category';
import { DataService } from './../services/data.service';
import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = "HomePage";
  categories: Category[];
  @ViewChild("nav") navCtrl: NavController;

  constructor(private languageService: LanguageService, translateService: TranslateService, private refreshService: RefreshService, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private dataService: DataService, private sortingService: SortingService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.categories = dataService.categories;
      this.languageService.initializeLanguage();
    });
  }

  clicked(category: string, name: string) {
    this.sortingService.setCategory({
      value: category,
      text: name
    });

    this.refreshService.refresh(true);
  }

  openBookmarks() {
    this.navCtrl.push("BookmarksPage");
  }

  changeLanguage() {
    this.languageService.showLanguageAlert();
  }
}

