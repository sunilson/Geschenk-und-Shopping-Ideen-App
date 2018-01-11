import { Injectable } from '@angular/core';
import { Product } from './../models/product';
import { Storage } from '@ionic/storage';

@Injectable()
export class BookmarkService {

    private bookmarks: Product[] = [];

    constructor(private storage: Storage) {
    }

    initializeBookmarks() {
        return new Promise((resolve, reject) => {
            return this.storage.get("bookmarks").then((value) => {
                console.log(value);
                if (value) {
                    this.bookmarks = value;
                }
                resolve(this.bookmarks);
            });
        });
    }

    getBookmarks() {
        return this.bookmarks;
    }

    addBookmark(prod: Product) {
        this.bookmarks.push(prod);
        this.storage.set("bookmarks", this.bookmarks);
    }

    removeBookmark(prod: Product) {
        this.bookmarks.splice(this.bookmarks.indexOf(prod), 1);
        this.storage.set("bookmarks", this.bookmarks);
    }

    isBookmarked(prod: Product) {
        if (prod) {
            for (let i = 0; i < this.bookmarks.length; i++) {
                if (this.bookmarks[i]) {
                    if (prod.id === this.bookmarks[i].id) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
}