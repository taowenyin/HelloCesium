import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from './main.component';
import {CesiumComponent} from '../pages/cesium/cesium.component';


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: MainComponent,
        children: [
            {path: '', pathMatch: 'full', component: CesiumComponent},
            {path: 'cesium', component: CesiumComponent}
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
