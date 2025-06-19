import { Injectable } from '@angular/core';
import { LoginModel, RegisterModel } from '../model/userReg.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
apiUrl: string ="https://localhost:7080/api/Auth/";
message: string ='';
  constructor(private http:HttpClient) { }
  
setMessage(data:any){
this.message=data;
}
getMessage(){
  return this.message;
}
  
onRegister(obj:RegisterModel):Observable<RegisterModel>{
  return this.http.post<RegisterModel>(this.apiUrl + "register", obj);
}
onLogin(obj:LoginModel):Observable<LoginModel>{
  return this.http.post<LoginModel>(this.apiUrl + "login", obj);
}
getUser(){
  return this.http.get(this.apiUrl )
}


}
