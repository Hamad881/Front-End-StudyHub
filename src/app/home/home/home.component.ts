import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';

import { HttpService } from '../../services/http.service';
import { ICategoryList } from '../../model/category.modal';
import { FormsModule } from '@angular/forms';
import { AddPost, GetAllPost, UpdatePost } from '../../model/post.model';
import { CommonModule, DatePipe, NgFor } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { AddComment, IGetComment, IGetCommentReply } from '../../model/comment.modal';
import { ProfileComponent } from '../../profile/profile/profile.component';
import { CurrentUserId, CurrentUserInfo } from '../../model/CurrentUserInfo.modal';
import { CommentComponent } from '../../comment/comment.component';
import { UserprofileComponent } from '../../userprofile/userprofile.component';
import { ReactComponent } from '../../react/react.component';
import { UserImageComponent } from '../../user-image/user-image.component';



@Component({
  selector: 'app-home',
  imports: [RouterLink,DatePipe,NgFor,ReactComponent,UserprofileComponent,UserImageComponent,CommentComponent,InfiniteScrollDirective,FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
router=inject(Router)
service=inject(UserService)
httpService= inject(HttpService)
categoryList:ICategoryList []=[]
postData:AddPost  = new AddPost();
addCmnt:{[key:number]:AddComment} = {};
getPostComment: { [key: number]: IGetComment[] } = {};
getCmntReply: { [key: number]: IGetCommentReply[] } = {};
profile = inject(ProfileComponent)
user :CurrentUserId = new CurrentUserId();

updatePostData: UpdatePost = new UpdatePost();
userInfo:CurrentUserInfo= new CurrentUserInfo();
postReact = 0;
pfpUrl:string ='';
//infinite scrolling
posts:GetAllPost[]=[];
skip=0;
take=2;
loading=false;
hasMore=true;
constructor(private http: HttpClient) {}

apiUrl= "https://localhost:7080/api/Post/all"
ngOnInit(){
  // this.service.getUser().subscribe((res:any)=>
  // this.userlist=res)
  this.httpService.getCategory().subscribe((res:any)=>
  this.categoryList=res)
  this.loadPosts();
  this.getUserInfo();
  this.httpService.getUserId().subscribe((res:any )=> this.user=res)
const token=localStorage.getItem("token")
if(!token){
  this.router.navigateByUrl("/sign-in")
}
}

createPost(){
  this.httpService.addPost(this.postData).subscribe((res:any)=> {
  alert(res.message);
  this.skip = 0;
  this.posts = [];
  this.loadPosts();
  
  }
);
this.postData = new AddPost();
}
loadPosts(){
  let params=new HttpParams()
  .set('skip', this.skip.toString())
  .set('take', this.take.toString());
  if(this.loading|| !this.hasMore) return;
  this.loading =true;
  this.http.get<any[]>(this.apiUrl, {params})
  .subscribe(res=>{
    console.log(res);
    this.posts.push(...res); 
    this.skip +=this.take;
    this.posts.forEach(post => {
  this.addCmnt[post.post_Id] = {
    comment_text: '',
    post_Id: post.post_Id
  }
  ;
  
});

    if(res.length<this.take){
      this.hasMore=false;
    }
    this.loading=false;
  });
}
onScroll(){
  this.loadPosts();
}
getComment(postId: number) {
  this.httpService.getPostComment(postId).subscribe((res: any) => {

      this.getPostComment[postId] = res;  
    // console.log ("aaa"+res);
    // console.log("bbb"+this.getPostComment[postId])
  });
}


commentReply(commentId: number) {
  
  this.httpService.getCommentReply(commentId).subscribe((res:any )=> {
    this.getCmntReply[commentId] = res ?? [];
  });
}
createComment(postId:number){
  
  this.addCmnt[postId].post_Id=postId;
  if(!this.addCmnt[postId].comment_text) return alert("It Can't be Done Empty!");

   this.httpService.addComment(this.addCmnt[postId]).subscribe((res:any)=>alert(res.message))

   this.addCmnt[postId].comment_text='';
}
deleteComment(commentId:number){
  this.httpService.delComment(commentId).subscribe((res:any)=>alert(res.message))
  
}
postUpdate(postId:number){
 
  this.httpService.updatePost(postId,this.updatePostData).subscribe((res:any)=>alert(res.message))
}
getPostByPostId(postId:number){
  this.httpService.getPostForUpdate(postId).subscribe((res:any)=>{
    this.updatePostData=res
  });
}
deletePost(postId:number){
  this.httpService.delPost(postId).subscribe((res:any)=>{
    alert(res.message)
    this.posts= this.posts.filter(p=>p.post_Id!==postId)
  })

}
getUserDetailsByUserId(userId:number){
  if(userId!==this.user.user_Id){
    this.router.navigate(['/userprofile'],{queryParams:{id:userId}})
  }
  else{
  this.router.navigateByUrl('/profile')}
}
getUserInfo(){
   this.httpService.getCurrentUserInfo().subscribe((res:any)=>{
    this.userInfo=res,
    
    this.getUserPfpByUsername()
  }
  
  
)

}
getUserPfpByUsername()
{
  this.httpService.getUserPfp(this.userInfo.username).subscribe((res:any)=>this.pfpUrl=res.url)
}


}
// getPostReact(postId:number){
//   this.httpService.getReactByPostId(postId).subscribe((res:any)=> this.postReact = res)
// }

