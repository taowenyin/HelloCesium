import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MainRoutingModule} from './main-routing.module';
import {MainComponent} from './main.component';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';
import {CesiumModule} from '../pages/cesium/cesium.module';

registerLocaleData(zh);

@NgModule({
    declarations: [MainComponent],
    imports: [
        CommonModule,
        MainRoutingModule,
        NgZorroAntdModule,
        FormsModule,
        HttpClientModule,
        CesiumModule,
    ],
    providers: [{provide: NZ_I18N, useValue: zh_CN}],
    bootstrap: [MainComponent]
})
export class MainModule {
}
