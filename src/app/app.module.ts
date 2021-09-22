import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layouts/default/default.module';
import { ProductsComponent } from './modules/products/products.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
//import { MatLabel, MatSelect, MatOption } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PedidoComponent } from './modules/pedido/pedido.component';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { PedidosComponent } from './modules/pedidos/pedidos.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {  ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { NgxMaskModule, IConfig } from 'ngx-mask'
@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    PedidoComponent,
    PedidosComponent,

  ],
  imports: [
    BrowserModule,
    MatNativeDateModule,
    MatDatepickerModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule,
    FormsModule,
    NgxPaginationModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    NgbModule,
    ReactiveFormsModule,
    MatInputModule,
    NgxMaskModule.forRoot()
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
