import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component'
import {AgregarProductoComponent} from './agregar-producto/agregar-producto.component'
import {EditarProductoComponent} from './editar-producto/editar-producto.component'
import {ProductoFaltanteComponent} from './producto-faltante/producto-faltante.component'
import { CanAccessGuard } from './core/guards/can-access.guard';

const routes: Routes = [
{path:'', redirectTo:'login', pathMatch:'full'},
{ path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) }, 
{path:'home', component:HomeComponent},
{path:'agregar-producto', 
canActivate: [CanAccessGuard],
component:AgregarProductoComponent},
{path:'productos-faltantes',
canActivate: [CanAccessGuard],
 component:ProductoFaltanteComponent},
{path:'editar-producto/:id',
canActivate: [CanAccessGuard],
 component:EditarProductoComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
