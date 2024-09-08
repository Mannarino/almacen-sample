import { Injectable } from '@angular/core';
declare let alertify: any;
@Injectable({
  providedIn: 'root'
})
export class AlertifyMessagesService {

   constructor() { }
  addItemMessage(){
    alertify.success('producto agregado');
  }
  updateItemMessage(){
    alertify.success('producto actualizado');
  }
  deleteItemMessage(){
    alertify.error('producto eliminado'); 
  }
  errorServer(){
    alertify.error('error en el servidor, intente luego'); 
  }
  invalidUser(){
    alertify.error('el usuario o contraseña fue incorrecta'); 
  }
}



