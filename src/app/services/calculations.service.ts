import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculationsService {

  constructor() { }
  obtenerPrecioFinal(precioCosto,porcentajeGanado){
  
	let porcentajeACalcular;
  
    if (porcentajeGanado < 10) {
        porcentajeACalcular = 1 + porcentajeGanado / 100;
    } else {
        porcentajeACalcular = 1 + porcentajeGanado / 100;
    }

    let precioFinal = precioCosto * porcentajeACalcular;
    console.log('El servicio de cálculo funciona correctamente.');
    return precioFinal;
  } 
}
