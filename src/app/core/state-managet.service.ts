import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Producto } from '../interfaces/producto';
@Injectable({
  providedIn: 'root'
})
export class StateManagetService {
  private listaSubject: BehaviorSubject<Producto[]> = new BehaviorSubject<Producto[]>([]);
  public lista$: Observable<Producto[]> = this.listaSubject.asObservable();

  constructor() { }

  getList(nuevaLista: Producto[]): void {
    this.listaSubject.next(nuevaLista);
  }

  addElement(elemento: Producto): void {
    const listaActual = this.listaSubject.getValue();
    const nuevaLista = [...listaActual, elemento];
    this.listaSubject.next(nuevaLista);
  }

  deleteElement(id: string): void {
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
