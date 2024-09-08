import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ProductosFaltantesService {

  constructor( private http:HttpClient) { }

  agregarProducto(producto){
     return this.http.post(`${environment.url_endpoint}/productos-faltantes`,producto)
    }
   getAllProducts(){
     return this.http.get(`${environment.url_endpoint}/productos-faltantes`)
    }
   deleteProducto(id){
     return this.http.delete(`${environment.url_endpoint}/productos-faltantes/${id}`)
    }
}
