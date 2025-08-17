import { Component,inject,Input, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-user-image',
  imports: [],
  templateUrl: './user-image.component.html',
  styleUrl: './user-image.component.css'
})
export class UserImageComponent implements OnInit {
httpService=inject(HttpService)
  pfpUrl:string = ''

  @Input () username:string =''
  ngOnInit(): void {
    this.getUserPfpByUsername()
  }
getUserPfpByUsername()
{
  this.httpService.getUserPfp(this.username).subscribe((res:any)=>this.pfpUrl=res.url)
}
}
