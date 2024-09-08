import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CalculationsService } from './calculations.service';

@Injectable({
  providedIn: 'root'
})
export class WatchAndSetService {

  constructor(private caculationsService:CalculationsService) { }

  watchAndSetFinalPriceInputControl(form: FormGroup){
    console.log('desde el nuevo servicio watch and setear')
    let precioCosto = form.get("precioCosto")
    let porcentajeGanancia = form.get("porcentajeGanancia")

  	form.get("porcentajeGanancia").valueChanges.subscribe(value=>{
      let CalculatedPrice = this.caculationsService.obtenerPrecioFinal( precioCosto.value,porcentajeGanancia.value )
      form.get("precioFinal").setValue(CalculatedPrice.toFixed(0))
    })    
       
  	form.get("precioCosto").valueChanges.subscribe(value=>{
  	  let CalculatedPrice = this.caculationsService.obtenerPrecioFinal( precioCosto.value,porcentajeGanancia.value )
      form.get("precioFinal").setValue(CalculatedPrice.toFixed(0))
    })  
  }
}
