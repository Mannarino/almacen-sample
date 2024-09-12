import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AlertifyMessagesService } from './alertify-messages.service';
import { Producto } from './interfaces/producto';
@Injectable({
  providedIn: 'root'
})
export class StateManagetService {
  private listaSubject: BehaviorSubject<Producto[]> = new BehaviorSubject<Producto[]>([]);
  public lista$: Observable<Producto[]> = this.listaSubject.asObservable();

  constructor(private http: HttpClient,
    private alertifyMesaggesService:AlertifyMessagesService) { }
    
  getAllProducts(){
    this.http.get('/assets/products.json')
    .subscribe( (value:Producto[]) =>{
      this.listaSubject.next(value);
    },
    error => {
        this.alertifyMesaggesService.errorServer()
    }) 
  }
  getProductById(id: string): Observable<Producto | undefined> {
    return this.http.get<Producto[]>('/assets/products.json').pipe(
      map((productos: Producto[]) => productos.find(producto => producto._id === id)),
      catchError(error => {
        this.alertifyMesaggesService.errorServer();
        return throwError(error);
      })
    );
  }
  
  getList(nuevaLista: Producto[]): void {
    this.listaSubject.next(nuevaLista);
  }

  addElement(elemento: Producto): void {
    this.alertifyMesaggesService.addItemMessage()
    const listaActual = this.listaSubject.getValue();
    const nuevaLista = [...listaActual, elemento];
    this.listaSubject.next(nuevaLista);
  }

  deleteElement(id: string): void {
    this.alertifyMesaggesService.deleteItemMessage()
    const listaActual = this.listaSubject.getValue();
    const indice = listaActual.findIndex(producto => producto._id === id);
    if (indice !== -1) {
      const nuevaLista = listaActual.filter(producto => producto._id !== id);
      this.listaSubject.next(nuevaLista);
    } else {
      console.error('Elemento no encontrado en la lista');
    }
  }
  
 
  editElement(id: string, nuevoProducto: Producto): void {
    this.alertifyMesaggesService.updateItemMessage()
    const listaActual = this.listaSubject.getValue();
  
    const indice = listaActual.findIndex(producto => producto._id === id);
    
    
    if (indice !== -1) {
      const listaActualizada = [...listaActual]; // Crear una nueva lista para no mutar la original
      listaActualizada[indice] = { ...listaActualizada[indice], ...nuevoProducto }; // Actualizar el producto
      this.listaSubject.next(listaActualizada);
    } else {
      console.error('Elemento no encontrado en la lista');
    }
  }
  
}
