import { TranslateModule } from '@ngx-translate/core';
import { BookmarksPage } from './bookmarks';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
    declarations: [
        BookmarksPage,
    ],
    imports: [
        IonicPageModule.forChild(BookmarksPage),
        TranslateModule.forChild()
    ],
    exports: [
        BookmarksPage
    ]
})
export class BookmarksPageModule { }
