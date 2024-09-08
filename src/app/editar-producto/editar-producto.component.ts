import { Component, OnInit } from '@angular/core';
import { FormControl , FormGroup } from '@angular/forms'
import { ProductosService } from '../core/productos.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Producto} from './../interfaces/producto'
import { CalculationsService } from '../services/calculations.service';
import { WatchAndSetService } from '../services/watch-and-set.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {
  
  parametro
  
  form: FormGroup
  private buildForm() {
    this.form = new FormGroup({
      _id : new FormControl(''),
    	nombre : new FormControl(''),
  		precioCosto : new FormControl(''),
 		  porcentajeGanancia : new FormControl(''),
  		precioFinal : new FormControl(''),
    })	
  
}
  constructor( private productosService:ProductosService,
  	           private route: ActivatedRoute,
  	           private router: Router,
              private watchAndSetService:WatchAndSetService
  	         ) 
             { this.buildForm()}

  ngOnInit(): void {
    this.watchAndSetService.watchAndSetFinalPriceInputControl(this.form)
  
  	this.route.params.subscribe(params => {
        this.parametro = params['id'];
        this.productosService.getOneProduct<Producto>(this.parametro)
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
    this.productosService.updateProduct(value,this.form.get("_id").value)
  }
	
}
