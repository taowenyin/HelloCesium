import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CesiumComponent} from './cesium.component';


const routes: Routes = [
    {path: '', pathMatch: 'full', component: CesiumComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CesiumRoutingModule {
}
