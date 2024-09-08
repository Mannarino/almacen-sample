import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MemoryService } from 'src/app/core/memory.service';

@Injectable({
  providedIn: 'root'
})
export class CanAccessGuard implements CanActivate {
  constructor(private memoryService:MemoryService,
    private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      if (this.memoryService.checkLogin()) {
        // Si el usuario está autenticado, permitir el acceso
        return true;
      } else {
        // Si el usuario no está autenticado, redirigir a la página de inicio de sesión
        return this.router.createUrlTree(['/login']); // Redirige a la ruta '/login'
      }
  }
  
}
