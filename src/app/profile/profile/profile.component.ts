import { Component,inject, Injectable, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { CurrentUserInfo } from '../../model/CurrentUserInfo.modal';
import { DatePipe } from '@angular/common';
import { GetAllPost } from '../../model/post.model';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-profile',
  imports: [RouterLink,DatePipe,FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})





export class ProfileComponent implements OnInit {

httpService= inject(HttpService) 
currentUserInfo : CurrentUserInfo = new CurrentUserInfo();



postObj: GetAllPost [] =[];
ngOnInit(): void {
  this.httpService.getCurrentUserInfo().subscribe((res:any)=>
    this.currentUserInfo=res
    

)
  this.httpService.getCurrentUserPost().subscribe((res:any)=>
    this.postObj=res)

}


onSaveChanges(){
  this.httpService.editUserInfo(this.currentUserInfo).subscribe((res:any)=>{
  alert(res.message)});
}
}
