import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyMessagesService } from 'src/app/core/alertify-messages.service';
import { HttpRequestService } from '../http-request.service';
import { MemoryService } from '../../core/memory.service';

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
  constructor(private httpRequestService:HttpRequestService,
              private router: Router,
              private memoryService:MemoryService,
              private notificationAlertifyMessages:AlertifyMessagesService) {
               
               }
  ngOnInit(): void {
      if( localStorage.getItem('remember')){
           this.form.setValue({
                user:localStorage.getItem('user') ,
                password:localStorage.getItem('password') ,
                remember: true
           });
      }
  } 
  get email() { return this.form.get('user'); }
  get password() { return this.form.get('password'); }
            
            
 
            
  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }
  access(): void {
    this.procesandoImg = true
    const remember = this.form.get('remember')?.value 
    const user = this.form.get('user')?.value
    const password = this.form.get('password')?.value
    
   this.memoryService.rememberUserAndPassword(remember,user,password)

   this.httpRequestService.loginUser(this.form.value)
           .subscribe(
              
               data => {
              this.procesandoImg = false
               this.memoryService.saveUserAndPassword(user,password)
               console.log(data)
               this.router.navigate(['/home']); 
            
               },
               error => {
                this.procesandoImg = false
                this.notificationAlertifyMessages.invalidUser()
                this.memoryService.cleanLocalstorage()
              
               }) 
  }           
  accessLikeEmpoyer(){
    this.memoryService.cleanLocalstorage()
    this.router.navigate(['/home']); 
  }             

}
