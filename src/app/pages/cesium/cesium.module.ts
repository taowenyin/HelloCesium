import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CesiumRoutingModule} from './cesium-routing.module';
import {CesiumComponent} from './cesium.component';

@NgModule({
    declarations: [CesiumComponent],
    imports: [
        CommonModule,
        CesiumRoutingModule
    ]
})
export class CesiumModule {
}
