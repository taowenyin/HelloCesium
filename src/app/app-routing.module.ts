import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';


const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'main', loadChildren: () => import('./main/main.module').then(m => m.MainModule)},
    {path: '', pathMatch: 'full', component: LoginComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {enableTracing: false})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
