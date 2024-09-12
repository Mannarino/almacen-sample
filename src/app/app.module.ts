import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BuscadorPipe } from './buscador.pipe';
import { AgregarProductoComponent } from './agregar-producto/agregar-producto.component';
import { EditarProductoComponent } from './editar-producto/editar-producto.component';
import { ProductoFaltanteComponent } from './producto-faltante/producto-faltante.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HeaderComponent } from './home/components/header/header.component';
import { LoadingImageComponent } from './home/components/loading-image/loading-image.component';
import { ProductActionsComponent } from './home/components/product-actions/product-actions.component';
import { ProductCountButtonComponent } from './home/components/product-count-button/product-count-button.component';
import { SearchBarComponent } from './home/components/search-bar/search-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BuscadorPipe,
    AgregarProductoComponent,
    EditarProductoComponent,
    ProductoFaltanteComponent,
    HeaderComponent,
    LoadingImageComponent,
    ProductActionsComponent,
    ProductCountButtonComponent,
    SearchBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
