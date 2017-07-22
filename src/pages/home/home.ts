import { BookmarkService } from './../../services/bookmark.service';
import { RefreshService } from './../../services/refresh.service';
import { SortingService } from './../../services/sorting.service';
import { Product } from './../../models/product';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, LoadingController, InfiniteScroll, ToastController } from 'ionic-angular';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';

/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  products: Product[];
  bookmarks: Product[];
  index: number = 5;
  errorMessage: string;
  title: string;
  infinity: boolean = true;

  constructor(private translateService: TranslateService, private bookmarkService: BookmarkService, private toastController: ToastController, private refreshService: RefreshService, private loadingCtrl: LoadingController, private sortCtrl: SortingService, private sheetCtrl: ActionSheetController, public navCtrl: NavController, public navParams: NavParams, private productService: ProductsService) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  ngOnInit() {
    Promise.all([this.sortCtrl.initializeData(), this.bookmarkService.initializeBookmarks()]).then((result) => {
      this.bookmarks = this.bookmarkService.getBookmarks();
      console.log(this.bookmarks);
      this.refresh();
      this.refreshService.refreshRequested.subscribe((value) => {
        if (value) {
          this.refresh();
        }
      });
    });
  }

  infinitescroll(event: InfiniteScroll) {
    this.productService.getProducts(this.index + 5).subscribe((data) => {
      if (data) {
        if (data.length > 0) {
          this.index += data.length;
        } else {
          this.translateService.get("keine_produkte_mehr").subscribe(value => {
            this.toastController.create({
              duration: 2000,
              message: value
            }).present();
          });
          this.infinity = false;
        }
        data.forEach(element => {
          this.products.push(element);
        });
      }
      event.complete();
    });
  }

  refresh(refresher?) {
    this.products = [];
    this.index = 5;
    this.infinity = true;
    this.title = this.sortCtrl.category.text;
    let loader;
    if (!refresher) {
      loader = this.loadingCtrl.create({
        content: "Loading data..."
      });
      loader.present();
    }

    this.productService.getProducts(this.index).subscribe((data) => {
      this.products = data;
      if (loader) {
        loader.dismiss();
      }
      if (refresher) {
        refresher.complete();
      }
    }, error => this.errorMessage = error);
  }



  openLink(url: string) {
    window.open(url, "_blank", "location=yes");
  }

  sort() {
    let currentCountry = this.sortCtrl.region.text;
    this.translateService.get(["Sort_by_region", "Sort_by_sex", "Sort_by_seller", currentCountry]).subscribe(values => {
      this.sheetCtrl.create({
        title: "Kategorie sortieren:",
        buttons: [
          {
            text: values["Sort_by_region"] + ": " + values[currentCountry],
            icon: "globe",
            handler: () => {
              this.sortCtrl.showRegionDialog();
            }
          }, {
            text: values["Sort_by_sex"] + ": " + this.sortCtrl.sex.text,
            icon: "woman",
            handler: () => {
              this.sortCtrl.showSexDialog();
            }
          }, {
            text: values["Sort_by_seller"] + ": " + this.sortCtrl.seller.text,
            icon: "pricetag",
            handler: () => {
              this.sortCtrl.showSellerDialog();
            }
          }, {
            text: "Close",
            icon: "close",
            role: "destructive",
            handler: () => {

            }
          }
        ]
      }).present();
    });
  }

  addBookmark(product: Product) {
    this.bookmarkService.addBookmark(product);
    console.log(this.bookmarks);
  }

  removeBookmark(product: Product) {
    this.bookmarkService.removeBookmark(product);
  }
}
