import { LanguageService } from './../services/language.service';
import { BookmarkService } from './../services/bookmark.service';
import { RefreshService } from './../services/refresh.service';
import { DataService } from './../services/data.service';
import { SortingService } from './../services/sorting.service';
import { ProductsService } from './../services/products.service';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule, Http } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TranslateModule, TranslateLoader, TranslatePipe } from '@ngx-translate/core';
import { createTranslateLoader } from "./translateLoader"


@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ProductsService,
    SortingService,
    DataService,
    RefreshService,
    BookmarkService,
    LanguageService
  ]
})
export class AppModule { }
