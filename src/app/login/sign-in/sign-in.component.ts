import { Component, inject } from '@angular/core';
import {Router, RouterLink } from '@angular/router';
import { LoginModel } from '../../model/userReg.model';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { RSAHelperService } from '../../services/rsahelper.service';

@Component({
  selector: 'app-sign-in',
  imports: [RouterLink,FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
loginObj: LoginModel=new LoginModel()
userService=inject(UserService)
  router= inject(Router);
  message:string="";
  rsaHelper= inject(RSAHelperService)
onSubmit(){
  const encryptData: any = {
    Username: this.loginObj.Username,  
    Password: this.rsaHelper.encryptWithPK(this.loginObj.Password)
      
    };
  this.userService.onLogin(encryptData).subscribe((res:any)=>{
    
    alert("Welcome!!"+ this.loginObj.Username)
    localStorage.setItem('token',res.token)
    this.router.navigateByUrl("/home")
    this.message="Welcome!!!"+this.loginObj.Username;
    this.userService.setMessage(this.message)
  },error=>{alert("Something Went Wrong.TryAgain!!")}

)
}
}
