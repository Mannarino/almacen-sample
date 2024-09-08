import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

  constructor(private http:HttpClient) { }
  loginUser(user:any){
    return this.http.post(`${environment.url_endpoint}/login`,user)
  }
}
