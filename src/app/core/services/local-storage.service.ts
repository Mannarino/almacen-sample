import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {

  constructor() { }

  // Métodos para manejar usuario y contraseña 
  rememberUserAndPassword(remember:boolean | null, user:string, password:string) {
    if (remember) {
      this.saveUserAndPassword(user, password);
      localStorage.setItem('remember', 'true');
    } else {
      this.cleanLocalstorage();
    }
  }
  
  getUser(): string | null {
    return localStorage.getItem('user');
  }

  getPassword(): string | null {
    return localStorage.getItem('password');
  }

  saveUserAndPassword(user: string, password: string) {
    localStorage.setItem('user', user);
    localStorage.setItem('password', password);
  }

  cleanLocalstorage() {
    localStorage.removeItem('user');
    localStorage.removeItem('password');
    localStorage.removeItem('remember');
  }

  //  métodos para manejar productos
  saveProducts(products: Producto[]) {
    localStorage.setItem('products', JSON.stringify(products));
  }

  getProducts(): Producto[] {
    const products = localStorage.getItem('products');
    return products ? JSON.parse(products) : []; // Si no hay productos, retorna un array vacío
  }

  addProduct(product: Producto) {
    const products = this.getProducts();
    products.push(product);
    this.saveProducts(products);
  }

  updateProduct(updatedProduct: Producto) {
    const products = this.getProducts();
    const index = products.findIndex(p => p._id === updatedProduct._id);
    if (index !== -1) {
      products[index] = updatedProduct;
      this.saveProducts(products);
    }
  }

  deleteProduct(id: string) {
    let products = this.getProducts();
    products = products.filter(p => p._id !== id);
    this.saveProducts(products);
  }
}

