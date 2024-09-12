import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-count-button',
  templateUrl: './product-count-button.component.html',
  styleUrls: ['./product-count-button.component.css']
})
export class ProductCountButtonComponent implements OnInit {
  @Input() cantidadProductos: number = 0;
  constructor() { }

  ngOnInit(): void {
  }

}
