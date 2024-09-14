import { Injectable } from '@angular/core';
import {  Observable, of } from 'rxjs';
import { Producto } from '../core/interfaces/producto';



@Injectable({
  providedIn: 'root'
})
export class ProductosFaltantesService {

  constructor() { }

  agregarProducto(producto){
     let productosFaltantes = localStorage.getItem('productos-faltantes')
     if(!productosFaltantes){
      let arrayProductosFaltantes = [producto]
      localStorage.setItem('productos-faltantes',JSON.stringify(arrayProductosFaltantes))
      return of('bien')
     }else{
       let arrayRecuperado = JSON.parse(localStorage.getItem('productos-faltantes'))
       arrayRecuperado.push(producto)
       localStorage.setItem('productos-faltantes',JSON.stringify(arrayRecuperado))
       return of('bueno')
     }
    }
   getAllProducts(): Observable<Producto | undefined>{
    let productosFaltantes = localStorage.getItem('productos-faltantes')
    const productos = JSON.parse(productosFaltantes);
      return of(productos); // Devolver los productos como Observable
    }
    
   deleteProducto(id){
    let productosFaltantes = localStorage.getItem('productos-faltantes');
    
    if (productosFaltantes) {
      let arrayRecuperado = JSON.parse(productosFaltantes);
      arrayRecuperado = arrayRecuperado.filter(producto => producto._id !== id); // Filtrar el producto que no coincide con el ID
      localStorage.setItem('productos-faltantes', JSON.stringify(arrayRecuperado));
      return of('Producto eliminado correctamente');
    } else {
      return of('No se encontraron productos para eliminar');
    }
  }
    
}
