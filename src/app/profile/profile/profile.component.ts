import { Component,inject, Injectable, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { CurrentUserInfo, ICurrentUserInfo } from '../../model/CurrentUserInfo.modal';
import { DatePipe } from '@angular/common';
import { GetAllPost, UpdatePost } from '../../model/post.model';
import { CommentComponent } from '../../comment/comment.component';
import { AddComment, IGetComment } from '../../model/comment.modal';
import { concatMap, tap } from 'rxjs';
import { ReactComponent } from '../../react/react.component';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-profile',
  imports: [RouterLink,DatePipe,ReactComponent,CommentComponent,FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})




export class ProfileComponent implements OnInit {

httpService= inject(HttpService) 
currentUserInfo : ICurrentUserInfo= new CurrentUserInfo();
getPostComment: { [key: number]: IGetComment[] } = {};
updatePostData: UpdatePost = new UpdatePost();
pfpUrl :string='';
addCmnt:{[key:number]:AddComment} = {};
postObj: GetAllPost [] =[];
// username:string ='';
ngOnInit(): void {
 this.getUserInfo();
//  console.log("hello"+this.currentUserInfo.username)
//  console.log(this.username)
  this.httpService.getCurrentUserPost().subscribe((res:any)=>{
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

onSaveChanges(){
  this.httpService.editUserInfo(this.currentUserInfo).subscribe((res:any)=>{
  alert(res.message)});
}
createComment(postId:number){
  
  this.addCmnt[postId].post_Id=postId;
  if(!this.addCmnt[postId].comment_text) return alert("It Can't be Done Empty!");

   this.httpService.addComment(this.addCmnt[postId]).subscribe((res:any)=>alert(res.message))

   this.addCmnt[postId].comment_text='';
}
getPostByPostId(postId:number){
  this.httpService.getPostForUpdate(postId).subscribe((res:any)=>{
    this.updatePostData=res
  });
}
deletePost(postId:number){
  this.httpService.delPost(postId).subscribe((res:any)=>{
    alert(res.message)
    this.postObj= this.postObj.filter(p=>p.post_Id!==postId)
  })

}
getUserInfo(){
   this.httpService.getCurrentUserInfo().subscribe((res:any)=>{
    this.currentUserInfo=res,
    
    this.getUserPfpByUsername()
  }
  
  
)

}
getUserPfpByUsername()
{
  this.httpService.getUserPfp(this.currentUserInfo.username).subscribe((res:any)=>this.pfpUrl=res.url)
}
addUserPfp(event:any)
{
  this.httpService.addUserPfp(event).subscribe((res:any)=>
  alert(res.message))
}
removePfp()
{
  this.httpService.deleteUserPfp().subscribe((res:any)=>{
    alert(res.message)
  })
}
}
