import { Component } from '@angular/core';
import { StateManagetService } from './core/state-managet.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  
  constructor(private managetStateService:StateManagetService)
               { }
  ngOnInit(): void {
    this.managetStateService.getAllProducts()
    
  }
  
}
