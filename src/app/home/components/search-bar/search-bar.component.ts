import { Component, OnInit, Output ,EventEmitter } from '@angular/core';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  // Evento que emite el valor de la búsqueda al componente padre
  @Output() searchProducto: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }
  

  onSearchProducto(value: string) {
    this.searchProducto.emit(value);
  }
}
