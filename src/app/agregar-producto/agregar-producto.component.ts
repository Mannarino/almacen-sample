import { Component, OnInit } from '@angular/core';
import { FormControl , FormGroup } from '@angular/forms'
import { AlertifyMessagesService } from '../core/alertify-messages.service';
import { StateManagetService } from '../core/state-managet.service';


import { CalculationsService } from '../services/calculations.service';
import { WatchAndSetService } from '../services/watch-and-set.service';


@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {
  
  
  form: FormGroup
  private buildForm() {
    this.form = new FormGroup({
    	nombre : new FormControl(''),
  		precioCosto : new FormControl(''),
 		  porcentajeGanancia : new FormControl(''),
  		precioFinal : new FormControl(''),
    })	
  }
  constructor(private managetStateSevice:StateManagetService,
              private watchAndSetService:WatchAndSetService,
              private alertifyMesaggesService:AlertifyMessagesService) { 
  		this.buildForm();
  }

  ngOnInit(): void {
  	this.watchAndSetService.watchAndSetFinalPriceInputControl(this.form)
  }

  addProduct(event: Event) {
    event.preventDefault();
    const value = this.form.value;
    this.managetStateSevice.addElement(value)
    this.limpiarFormulario()
  }

  limpiarFormulario(){
    this.form.get("nombre").setValue('')
    this.form.get("precioCosto").setValue('')
    this.form.get("porcentajeGanancia").setValue('')
    this.form.get("precioFinal").setValue('')
  }
  
}
