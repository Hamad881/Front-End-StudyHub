import { DatePipe } from '@angular/common';
import { Component, inject, OnInit,Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { CurrentUserId, CurrentUserInfo } from '../model/CurrentUserInfo.modal';
import { GetAllPost } from '../model/post.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AddComment, IGetComment } from '../model/comment.modal';
import { CommentComponent } from '../comment/comment.component';
import { ReactComponent } from '../react/react.component';
import { UserImageComponent } from '../user-image/user-image.component';

@Component({
  selector: 'app-userprofile',
  imports: [RouterLink,CommentComponent,UserImageComponent,ReactComponent,FormsModule,DatePipe],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.css'
})
export class UserprofileComponent implements OnInit {
httpService= inject(HttpService) 
 userDetail : CurrentUserInfo = new CurrentUserInfo();
 route = inject(ActivatedRoute)
userId!:number
getPostComment: { [key: number]: IGetComment[] } = {};
pfpUrl:string=''
addCmnt:{[key:number]:AddComment} = {};
postObj: GetAllPost [] =[];
user: CurrentUserId = new CurrentUserId()
currentPfpUrl:string=''
ngOnInit(): void {

this.route.queryParams.subscribe((params)=>{
  this.userId= params['id'];
  if(this.userId){
    this.userDetailsById()
  }
})
this.getCurrentUser()

  this.httpService.getUserPostById(this.userId).subscribe((res:any)=>{
    this.postObj=res
     this.postObj.forEach(post => {
  this.addCmnt[post.post_Id] = {
    comment_text: '',
    post_Id: post.post_Id
  };
});
}
  )

}
getComment(postId: number) {
  this.httpService.getPostComment(postId).subscribe((res: any) => {

      this.getPostComment[postId] = res;
     
      
    // console.log ("aaa"+res);
    // console.log("bbb"+this.getPostComment[postId])
  });
}

userDetailsById(){
  this.httpService.getUserDetailsById(this.userId).subscribe((res:any)=>{this.userDetail=res
    this.getUserPfpByUsername()
  })
}
createComment(postId:number){
  
  this.addCmnt[postId].post_Id=postId;
  if(!this.addCmnt[postId].comment_text) return alert("It Can't be Done Empty!");

   this.httpService.addComment(this.addCmnt[postId]).subscribe((res:any)=>alert(res.message))

   this.addCmnt[postId].comment_text='';
}
getUserPfpByUsername()
{
  this.httpService.getUserPfp(this.userDetail.username).subscribe((res:any)=>this.pfpUrl=res.url)
}
getCurrentUserPfpByUsername()
{
  this.httpService.getUserPfp(this.user.username).subscribe((res:any)=>this.currentPfpUrl=res.url)
}
getCurrentUser()
{
  this.httpService.getUserId().subscribe((res:any)=>{this.user=res
    this.getCurrentUserPfpByUsername()
  })
}
}


