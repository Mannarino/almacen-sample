import { Component } from '@angular/core';
import { ProductosService } from './core/productos.service';
import { MemoryService } from './core/memory.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  
  constructor(private productosService:ProductosService
              ) { }
  ngOnInit(): void {
    //obtengo todos los productos de la api rest 
    this.productosService.getAllProducts()
    
  }
  
}
