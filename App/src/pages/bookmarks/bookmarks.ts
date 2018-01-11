import { BookmarkService } from './../../services/bookmark.service';
import { Product } from './../../models/product';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';


/**
 * Generated class for the BookmarksPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-bookmarks',
  templateUrl: 'bookmarks.html',
})
export class BookmarksPage implements OnInit {

  products: Product[];

  constructor(translateService: TranslateService, private alertCtrl: AlertController, private bookmarkService: BookmarkService, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookmarksPage');
  }

  ngOnInit() {
    this.bookmarkService.initializeBookmarks().then((data) => {
      if (data) {
        console.log(data);
        this.products = <Product[]>data;
      }
    });
  }

  delete(product: Product) {
    this.alertCtrl.create({
      title: "Delete Bookmark",
      message: "Do you want to remove this bookmark?",
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Confirm",
          handler: () => {
            this.bookmarkService.removeBookmark(product);

          }
        }
      ]
    }).present();
  }
}
