import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { CadastroComponent } from './modules/cadastro/cadastro.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { LoginComponent } from './modules/login/login.component';
import { PedidoComponent } from './modules/pedido/pedido.component';
import { PedidosComponent } from './modules/pedidos/pedidos.component';
import { PostsComponent } from './modules/posts/posts.component';
import { ProductsComponent } from './modules/products/products.component';
import { AuthGuard } from './shared/auth.guard';


const routes: Routes = [{
  path: '',
  component: DefaultComponent,
  children: [{
    path: '',
    component: DashboardComponent
  }, {
    path: 'posts',
    component: PostsComponent
  },
  {
    path: 'products', component: ProductsComponent
  },
  {
    path: 'pedido', component: PedidoComponent
  },
  {
    path: 'pedidos', component: PedidosComponent
  }
  ],
  canActivate: [AuthGuard]
  },
  { path: 'login', component:LoginComponent},
  { path: 'cadastro', component:CadastroComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
