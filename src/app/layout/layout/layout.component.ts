import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  router=inject(Router)
  
logOut(){
  if(confirm("Are you Sure to LogOut?")){localStorage.clear();
  this.router.navigateByUrl("/sign-in")}
  
}
}
