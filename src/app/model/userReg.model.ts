export interface IuserList{
   name: string;
}
export class RegisterModel{
  
Name: string;
Username: string;
Password: string;
Email:string;
 
constructor() {
  
   this.Name='';
   this.Username='';
   this.Email='';
   this.Password='';
}
}
export class LoginModel{
    Password: string;
    Username:string;
constructor() {

   this.Username='';
   this.Password='';
}
}
export class GetUser{
   name:string;
   /**
    *
    */
   constructor() {
     this.name='';
      
   }
}