import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment'
import {Producto} from '../interfaces/producto'
import { StateManagetService } from './state-managet.service';
import { tap } from 'rxjs/operators';
import { AlertifyMessagesService } from './alertify-messages.service';
@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  
  constructor(private http: HttpClient,
              private stateManagetService:StateManagetService,
              private alertifyMesaggesService:AlertifyMessagesService) { }

  addProduct(producto){
     return this.http.post(`${environment.url_endpoint}/productos/`,producto)
              .pipe(
                tap((response:Producto) => {
                  this.stateManagetService.addElement(response);
                })
    );
    }

  getAllProducts(){
      this.http.get(`${environment.url_endpoint}/productos/`)
      .subscribe( (value:Producto[]) =>{
        this.stateManagetService.getList(value)
      },
      error => {
          this.alertifyMesaggesService.errorServer()
      }) 
    }
    
  getOneProduct<Producto>(id){
     return this.http.get(`${environment.url_endpoint}/productos/${id}`)
    } 
  updateProduct(producto,id){
     return this.http.put(`${environment.url_endpoint}/productos/${id}`,producto)
              .pipe(
                tap((response:Producto) => {
                  this.stateManagetService.editElement(id,producto);
                })
          ).subscribe(producto =>{ 
            this.alertifyMesaggesService.updateItemMessage()
          },
          error => {
             this.alertifyMesaggesService.errorServer()
          })
    }
  deleteProducto(id){
     return this.http.delete(`${environment.url_endpoint}/productos/${id}`)
              .pipe(
                tap((response:Producto) => {
                  this.stateManagetService.deleteElement(id);
                })
              ) .subscribe(value => {
                this.alertifyMesaggesService.deleteItemMessage()
                 },
                 error => {
                    this.alertifyMesaggesService.errorServer()
                 });
  }  

  
}
