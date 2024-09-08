import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscador'
})
export class BuscadorPipe implements PipeTransform {

  transform(lista: any, texto: string): unknown {

  	if(!texto){
  		return lista
  	}
    return lista.filter( producto => producto.nombre.toUpperCase().includes(texto.toUpperCase()));
  }

}
