import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/login/auth.service';


@Injectable({
  providedIn: 'root'
})
export class CanAccessGuard implements CanActivate {
  constructor(
    private authService: AuthService,  // Inyectamos el AuthService
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Verificamos si el usuario está autenticado (si existe un token)
    if (this.authService.isAuthenticated()) {
      return true;  // Permitir acceso
    } else {
      // Redirigir al usuario a la página de login si no está autenticado
      return this.router.navigate(['/login']);
    }
  }
  
}
