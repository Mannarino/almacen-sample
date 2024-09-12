import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/login/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private authService:AuthService) { }

  ngOnInit(): void {
  }
  makeLogout() {
    // Llamamos al servicio de autenticación para borrar el token
    this.authService.removeToken()
    
    // Redirigimos al usuario a la página de login
    this.router.navigate(['/login']);
  }
  
}
