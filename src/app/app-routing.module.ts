import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
    {path: '', redirectTo: 'products', pathMatch: 'full'},
    {path: 'products', loadChildren: './products/products.module#ProductsModule'},
    {path: 'settings', loadChildren: './settings/settings.module#SettingsModule'},
    {path: 'login', component: LoginComponent},
    {path: 'orders', loadChildren: './orders/orders.module#OrdersModule'},
    {path: 'chat', loadChildren: './chat/chat.module#ChatModule'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
