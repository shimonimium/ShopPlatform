import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ProductsComponent} from './products/products.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './services/in-memory-data.service';
import {FormsModule} from '@angular/forms';
import {NavComponent} from './nav/nav.component';
import {MaterialModule} from './material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        AppComponent,
        ProductsComponent,
        ProductDetailComponent,
        NavComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        AppRoutingModule,
        HttpClientModule,
        // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
        // and returns simulated server responses.
        // Remove it when a real server is ready to receive requests.
        HttpClientInMemoryWebApiModule.forRoot(
            InMemoryDataService, {dataEncapsulation: false}
        ),
        FormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
