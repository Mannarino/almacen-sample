import { Component, OnInit } from '@angular/core';
import { FormControl , FormGroup } from '@angular/forms'

import { StateManagetService } from '../core/services/state-managet.service';
import { WatchAndSetService } from '../core/services/watch-and-set.service';


@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {
  
  
 // Definición del formulario que manejará los datos del producto
 form: FormGroup;

 // Método privado que inicializa el formulario con los campos necesarios para el producto
 private buildForm() {
   this.form = new FormGroup({
     // Campo para el nombre del producto
     nombre: new FormControl(''),
     // Campo para el precio de costo
     precioCosto: new FormControl(''),
     // Campo para el porcentaje de ganancia
     porcentajeGanancia: new FormControl(''),
     // Campo para el precio final (calculado automáticamente)
     precioFinal: new FormControl(''),
   });
 }

  
  constructor(private managetStateSevice:StateManagetService,
              private watchAndSetService:WatchAndSetService
               // Se inyectan los servicios necesarios: 
  // 1. StateManagetService para manejar el estado de los productos
  // 2. WatchAndSetService para observar y calcular el precio final
              ) { 
      // Inicialización del formulario al construir el componente       
  		this.buildForm();
  }

  ngOnInit(): void {
    // Se configura el servicio para observar los cambios en el formulario
    // y calcular el precio final automáticamente cuando cambien los valores de 
    // precioCosto o porcentajeGanancia
  	this.watchAndSetService.watchAndSetFinalPriceInputControl(this.form)
  }

  addProduct(event: Event) {
    event.preventDefault();
    const value = this.form.value;
    // Se agrega el nuevo producto al estado utilizando el servicio de manejo de estado
    this.managetStateSevice.addElement(value);
    // Se limpia el formulario para prepararlo para la entrada de un nuevo producto
    this.limpiarFormulario()
  }

  // Método para limpiar los campos del formulario
  limpiarFormulario() {
    // Se resetean los valores de los campos del formulario a sus valores iniciales (vacíos)
    this.form.get("nombre").setValue('');
    this.form.get("precioCosto").setValue('');
    this.form.get("porcentajeGanancia").setValue('');
    this.form.get("precioFinal").setValue('');
  }
  
}
