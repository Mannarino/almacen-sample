import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class WatchAndSetService {

  constructor() { }

  // Este método observa los cambios en los campos 'precioCosto' y 'porcentajeGanancia' del formulario,
  // y automáticamente calcula el 'precioFinal' cada vez que uno de ellos cambia.
  watchAndSetFinalPriceInputControl(form: FormGroup){
    console.log('desde el nuevo servicio watch and setear')

    // Obtener referencias a los campos 'precioCosto' y 'porcentajeGanancia' del formulario
    let precioCosto = form.get("precioCosto")
    let porcentajeGanancia = form.get("porcentajeGanancia")

  	// Suscribirse a los cambios en el campo 'porcentajeGanancia'
    form.get("porcentajeGanancia").valueChanges.subscribe(value => {
      // Calcular el precio final basado en el valor actual de 'precioCosto' y 'porcentajeGanancia'
      let CalculatedPrice = this.obtenerPrecioFinal(precioCosto.value, porcentajeGanancia.value);
      // Establecer el valor calculado en el campo 'precioFinal' redondeado a 0 decimales
      form.get("precioFinal").setValue(CalculatedPrice.toFixed(0));
    });

    // Suscribirse a los cambios en el campo 'precioCosto'
    form.get("precioCosto").valueChanges.subscribe(value => {
      // Calcular el precio final basado en el valor actual de 'precioCosto' y 'porcentajeGanancia'
      let CalculatedPrice = this.obtenerPrecioFinal(precioCosto.value, porcentajeGanancia.value);
      // Establecer el valor calculado en el campo 'precioFinal' redondeado a 0 decimales
      form.get("precioFinal").setValue(CalculatedPrice.toFixed(0));
    });
  }

  private obtenerPrecioFinal(precioCosto,porcentajeGanado){
  
    let porcentajeACalcular;
    
       // Verificar si el porcentaje de ganancia es menor que 10
    // (en este caso no se realiza ninguna modificación significativa)
    if (porcentajeGanado < 10) {
      porcentajeACalcular = 1 + porcentajeGanado / 100;
    } else {
      porcentajeACalcular = 1 + porcentajeGanado / 100;
    }

    // Calcular el precio final sumando el porcentaje de ganancia al precio de costo
    let precioFinal = precioCosto * porcentajeACalcular;
    
      console.log('El servicio de cálculo funciona correctamente.');
      return precioFinal;
    } 
}
