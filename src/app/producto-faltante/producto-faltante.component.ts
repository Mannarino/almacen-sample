import { Component, OnInit } from '@angular/core';
import { FormControl , FormGroup } from '@angular/forms'
import {ProductosFaltantesService} from './../services/productos-faltantes.service'


@Component({
  selector: 'app-producto-faltante',
  templateUrl: './producto-faltante.component.html',
  styleUrls: ['./producto-faltante.component.css']
})
export class ProductoFaltanteComponent implements OnInit {
  
  lista;
  parametro
  sucess =false
  form: FormGroup
   private buildForm() {
    this.form = new FormGroup({
    	nombre : new FormControl('')
    })	
  
}
  constructor( private productosFaltantesService:ProductosFaltantesService) 
             { this.buildForm()}

  ngOnInit(): void {
    this.cargarListaDeProductosFaltantes()
  }
  
  agregarFaltante(event: Event) {
      event.preventDefault()
      const value = this.form.value
      this.productosFaltantesService.agregarProducto(value)
      .subscribe(
          producto=>{ 
            this.sucess=true
            this.form.get("nombre").setValue('')
            this.cargarListaDeProductosFaltantes()
            setTimeout(()=>{ this.sucess=false},3000)
          },
          error => {
              console.error('Error al agregar el producto:', error);
              alert('error en el servidor  al querer agregar un producto a la lista de productos faltantess,pruebe mas tarde')
          }
      )
  }

  eliminar(id){
     this.productosFaltantesService.deleteProducto(id)
     .subscribe(value => {
        let productIndex = this.lista.findIndex(item => item._id === id)
        this.lista.splice(productIndex,1)
        },
        error => {
            console.error('Error al eliminar el producto:', error);
            alert('error en el servidor  al querer eliminar un producto a la lista de productos faltantes,pruebe mas tarde')
        }
      )
  }

  cargarListaDeProductosFaltantes(){
    //codigo para vovler a obtener la lista actualizada desde el server a traves de un nuevo request
    this.productosFaltantesService.getAllProducts()
      .subscribe(
        value =>{ this.lista = value},
        error => {
          console.error('Error al obtener la lista de productos faltantes:', error);
          alert('error en el servidor  al querer obtener la lista de productos faltantes,pruebe mas tarde')
        }
      )
  }
}
