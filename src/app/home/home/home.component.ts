import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';

import { HttpService } from '../../services/http.service';
import { ICategoryList } from '../../model/category.modal';
import { FormsModule } from '@angular/forms';
import { AddPost, GetAllPost } from '../../model/post.model';
import { CommonModule, DatePipe, NgFor } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { AddComment, IGetComment, IGetCommentReply } from '../../model/comment.modal';
import { ProfileComponent } from '../../profile/profile/profile.component';
import { CurrentUserId } from '../../model/CurrentUserInfo.modal';



@Component({
  selector: 'app-home',
  imports: [RouterLink,DatePipe,NgFor, InfiniteScrollDirective,FormsModule, CommonModule],
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




//infinite scrolling
posts:any[]=[];
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
  this.httpService.getUserId().subscribe((res:any )=> this.user=res)
const token=localStorage.getItem("token")
if(!token){
  this.router.navigateByUrl("/sign-in")
}
}

createPost(){
  this.httpService.addPost(this.postData).subscribe((res:any)=> 
  alert(res.message))

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
  };
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
}
