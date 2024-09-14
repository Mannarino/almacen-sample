import { Component, OnInit } from '@angular/core';
import { FormControl , FormGroup } from '@angular/forms'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Producto} from '../core/interfaces/producto'
import { StateManagetService } from '../core/services/state-managet.service';
import { WatchAndSetService } from '../core/services/watch-and-set.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {
  
  // Propiedad para almacenar el parámetro de la ruta (ID del producto)
  parametro
  
  // Definición del formulario que manejará los datos del producto
  form: FormGroup;

  // Método que inicializa el formulario con los campos necesarios
  // Cada campo tiene un FormControl que gestiona su valor y estado
  private buildForm() {
    this.form = new FormGroup({
      _id : new FormControl(''),
    	nombre : new FormControl(''),
  		precioCosto : new FormControl(''),
 		  porcentajeGanancia : new FormControl(''),
  		precioFinal : new FormControl(''),
    })	
  
}
  constructor(private managetStateSevice:StateManagetService,
  	          private route: ActivatedRoute,
              private watchAndSetService:WatchAndSetService
  	         ) //se inyectan los servicios necesarios:
             // - StateManagetService: para manejar el estado del producto (obtener y editar).
             // - ActivatedRoute: para obtener los parámetros de la URL (en este caso, el ID del producto).
             // - WatchAndSetService: para observar los cambios en los campos y recalcular el precio final automáticamente.
             { this.buildForm()// Se inicializa el formulario al crear la instancia del componente.
            }

  ngOnInit(): void {
    this.watchAndSetService.watchAndSetFinalPriceInputControl(this.form)
  
  	this.route.params.subscribe(params => {
        this.parametro = params['id'];
        this.managetStateSevice.getProductById(this.parametro)
          .subscribe((value:Producto )=> {
              this.form.get("_id").setValue(value._id)
              this.form.get("nombre").setValue(value.nombre)
              this.form.get("precioCosto").setValue(value.precioCosto)
              this.form.get("porcentajeGanancia").setValue(value.porcentajeGanancia)
              this.form.get("precioFinal").setValue(value.precioFinal)
            })
    });
  }
  
  actualizar(event: Event) {
    event.preventDefault();
    const value = this.form.value;
    this.managetStateSevice.editElement(this.form.get("_id").value,value)
  }
	
}
