import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RegisterModel } from '../../model/userReg.model';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-registration',
  imports: [RouterLink,FormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})

export class RegistrationComponent {
registerObj: RegisterModel = new RegisterModel()
userService= inject(UserService)
onSubmit(){
this.userService.onRegister(this.registerObj).subscribe((res:RegisterModel)=>{
  alert('User Registered!!')
},
error=>{alert(error.error)}
)
}
}
