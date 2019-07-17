import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CesiumRoutingModule} from './cesium-routing.module';
import {CesiumComponent} from './cesium.component';
import {AngularCesiumModule, AngularCesiumWidgetsModule} from 'angular-cesium';

@NgModule({
    declarations: [CesiumComponent],
    imports: [
        CommonModule,
        CesiumRoutingModule,
        AngularCesiumModule.forRoot(),
        AngularCesiumWidgetsModule
    ]
})
export class CesiumModule {
}
