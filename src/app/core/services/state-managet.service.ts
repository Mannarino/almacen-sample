import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { AlertifyMessagesService } from './alertify-messages.service';
import { Producto } from '../interfaces/producto';
import { LocalStorageService } from './local-storage.service';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class StateManagetService {
  
  private localStorageKey = 'productos'; // Clave para localStorage
  private listaSubject: BehaviorSubject<Producto[]> = new BehaviorSubject<Producto[]>([]);
  public lista$: Observable<Producto[]> = this.listaSubject.asObservable();

  constructor(
    private localStorageService: LocalStorageService,
    private http: HttpClient,
    private alertifyMesaggesService: AlertifyMessagesService
  ) {
    this.loadInitialData(); // Cargar datos iniciales al iniciar el servicio
  }

  
   // Cargar productos desde localStorage al iniciar la app
   private loadInitialData() {
    setTimeout(() => {
      const productos = this.localStorageService.getProducts();
      if (productos.length === 0) {
        this.getAllProductsFromJson();
      } else {
        this.listaSubject.next(productos);
      }
    }, 2000);
    
  }

  private getAllProductsFromJson() {
    // Aquí puedes cargar los productos desde el JSON solo la primera vez
    this.http.get<Producto[]>('/assets/products.json')
      .subscribe((value: Producto[]) => {
        const listaInvertida = [...value].reverse();
        this.localStorageService.saveProducts(listaInvertida); // Guardar en localStorage
        this.listaSubject.next(listaInvertida); // Emitir la lista
      }, error => {
        this.alertifyMesaggesService.errorServer();
      });
  }

    // Obtener producto por ID y devolver un Observable
  getProductById(id: string): Observable<Producto | undefined> {
      return this.lista$.pipe(
        map((productList: Producto[]) => productList.find(producto => producto._id === id)) // Encontrar el producto por ID
      );
    }

  addElement(elemento: Producto): void {
    this.alertifyMesaggesService.addItemMessage();
    const listaActual = this.listaSubject.getValue();
    const nuevaLista = [elemento, ...listaActual];
    this.localStorageService.saveProducts(nuevaLista); // Actualizar localStorage
    this.listaSubject.next(nuevaLista); // Emitir la lista actualizada
  }

  deleteElement(id: string): void {
    this.alertifyMesaggesService.deleteItemMessage();
    const listaActual = this.listaSubject.getValue();
    const nuevaLista = listaActual.filter(producto => producto._id !== id);
    this.localStorageService.saveProducts(nuevaLista); // Actualizar localStorage
    this.listaSubject.next(nuevaLista); // Emitir la lista actualizada
  }

  editElement(id: string, nuevoProducto: Producto): void {
    this.alertifyMesaggesService.updateItemMessage();
    const listaActual = this.listaSubject.getValue();
    const indice = listaActual.findIndex(producto => producto._id === id);

    if (indice !== -1) {
      const listaActualizada = [...listaActual];
      listaActualizada[indice] = { ...listaActualizada[indice], ...nuevoProducto };
      this.localStorageService.saveProducts(listaActualizada); // Actualizar localStorage
      this.listaSubject.next(listaActualizada); // Emitir la lista actualizada
    }
  }
}
  

