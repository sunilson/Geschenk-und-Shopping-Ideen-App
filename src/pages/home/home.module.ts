import { TranslateModule } from '@ngx-translate/core';
import { HomePage } from './home';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
    declarations: [
        HomePage,
    ],
    imports: [
        IonicPageModule.forChild(HomePage),
        TranslateModule.forChild()
    ],
    exports: [
        HomePage
    ]
})
export class HomePageModule { }
