import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  rememberUserAndPassword(remember:boolean | null,user:string, password:string){
    if (remember) {
       this.saveUserAndPassword(user,password)
       localStorage.setItem('remember', 'true');
    } else {
       this.cleanLocalstorage()
    }
  }
  
  getUser(): string | null {
    return localStorage.getItem('user');
  }

  getPassword(): string | null {
    return localStorage.getItem('password');
  }

  saveUserAndPassword(user:string, password:string){
    localStorage.setItem('user',user);
    localStorage.setItem('password',password);
  }
  cleanLocalstorage(){
    localStorage.removeItem('user');
    localStorage.removeItem('password');
    localStorage.removeItem('remember');
  }
}
