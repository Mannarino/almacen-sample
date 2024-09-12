import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './interfaces/user';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private tokenKey = 'auth_token';
  
  constructor(private http:HttpClient) { }

  // Método para iniciar sesión y obtener el token
  loginUser(username: string, password: string) {
    return this.http.get<User[]>('/assets/users.json').pipe(
      map(users => {
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
          this.setToken(user.token);  // Guardar el token al iniciar sesión
          return { token: user.token };
        } else {
          // Asegúrate de lanzar el error correctamente
        throw new Error('Usuario o contraseña incorrectos');
        }
      }),
      catchError(error => {
        return throwError('Error en el servidor');
      })
    );
  }

  // Método para guardar el token
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Método para obtener el token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Método para eliminar el token (logout)
  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== null;
  }
  
}
