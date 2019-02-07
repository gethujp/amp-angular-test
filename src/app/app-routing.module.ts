import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component'

const routes: Routes = [{ path: '', component: ProductsComponent },
{ path: 'products', component: ProductsComponent },
{ path: 'cart', component: CartComponent },
{ path: '**', redirectTo: '' }];
export const routing = RouterModule.forRoot(routes);
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
