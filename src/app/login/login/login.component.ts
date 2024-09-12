import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyMessagesService } from 'src/app/core/services/alertify-messages.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 
  showPassword: boolean = false;
  procesandoImg=false
  form = new FormGroup({
    user: new FormControl('',[Validators.required]),
    password: new FormControl('', Validators.required),
    remember: new FormControl(false)
  });
  constructor(private authService:AuthService,
              private router: Router,
              private localStorageService:LocalStorageService,
              private notificationAlertifyMessages:AlertifyMessagesService) {
               
               }
  ngOnInit(): void {
      // Si existe la clave 'remember' en localStorage, rellenamos los campos
    if (localStorage.getItem('remember')) {
      this.form.setValue({
        user: this.localStorageService.getUser() || '',
        password: this.localStorageService.getPassword() || '',
        remember: true
      });
    }

    // Escuchar los cambios en el control 'remember'
    this.form.get('remember')?.valueChanges.subscribe((remember: boolean) => {
      const user = this.form.get('user')?.value || '';
      const password = this.form.get('password')?.value || '';

      // Utiliza tu servicio para gestionar el localStorage
      this.localStorageService.rememberUserAndPassword(remember, user, password);
    });
  } 
  get email() { return this.form.get('user'); }
  get password() { return this.form.get('password'); }
                     
  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  access(): void {
    this.procesandoImg = true;
  
    const remember = this.form.get('remember')?.value;
    const user = this.form.get('user')?.value;
    const password = this.form.get('password')?.value;
  
    this.authService.loginUser(user, password).subscribe(
      data => {
        this.procesandoImg = false;
        
        // Verifica si el usuario quiere recordar las credenciales y guarda o limpia el localStorage
        if (remember) {
          this.localStorageService.saveUserAndPassword(user, password);
          localStorage.setItem('remember', 'true');
        } else {
          this.localStorageService.cleanLocalstorage();
        }
  
        // Redirige al usuario al home
        this.router.navigate(['/home']);
      },
      error => {
        this.procesandoImg = false;
        this.notificationAlertifyMessages.invalidUser();
        console.log(error);
      }
    );
  }
  accessLikeEmpoyer(){
    this.localStorageService.cleanLocalstorage()
    this.router.navigate(['/home']); 
  }             

}
