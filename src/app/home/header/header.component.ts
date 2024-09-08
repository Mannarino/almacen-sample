import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemoryService } from 'src/app/core/memory.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router,
    private memoryService:MemoryService) { }

  ngOnInit(): void {
  }
  makeLogout(){
    this.router.navigate(['/login']);
    this.memoryService.cleanLocalstorage()
  }
}
