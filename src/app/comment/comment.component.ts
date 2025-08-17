import { CommonModule } from '@angular/common';
import { Component, inject, Input, input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AddComment, AddCommentReply, IGetComment, IGetCommentReply } from '../model/comment.modal';
import { HttpService } from '../services/http.service';
import { CurrentUserId } from '../model/CurrentUserInfo.modal';
import { FormsModule } from '@angular/forms';
import { UserImageComponent } from '../user-image/user-image.component';

@Component({
  selector: 'app-comment',
  imports: [RouterLink,CommonModule,UserImageComponent,FormsModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent implements OnInit{
  router=inject(Router)
httpService= inject(HttpService)
addCmnt:{[key:number]:AddComment} = {};
getCmntReply: { [key: number]: IGetCommentReply[] } = {};
user :CurrentUserId = new CurrentUserId();
addCmntReply: AddCommentReply = new AddCommentReply();
pfpUrl:string=''
@Input() post_Id:number = 0 ;
@Input() getPostComment: IGetComment [] = []

ngOnInit() {
  this.httpService.getUserId().subscribe((res:any )=> {this.user=res
this.getUserPfpByUsername()
  })

  
}

// getComment(postId: number) {
//   this.httpService.getPostComment(postId).subscribe((res: any) => {
// console.log(res);
//       this.getPostComment[postId] = res;
    
//   });
// }


commentReply(commentId: number) {
  
  this.httpService.getCommentReply(commentId).subscribe((res:any )=> {
    this.getCmntReply[commentId] = res ?? [];
  });
}
// createComment(postId:number){
  
//   this.addCmnt[postId].post_Id=postId;
//   if(!this.addCmnt[postId].comment_text) return alert("It Can't be Done Empty!");

//    this.httpService.addComment(this.addCmnt[postId]).subscribe((res:any)=>alert(res.message))

//    this.addCmnt[postId].comment_text='';
// }
deleteComment(commentId:number){
  this.httpService.delComment(commentId).subscribe((res:any)=>{
    alert(res.message);
    this.getPostComment=this.getPostComment.filter(c=>c.comment_Id!==commentId)
  })
  
}
addCommentReply(commentId:number){
  this.httpService.addReply(commentId,this.addCmntReply).subscribe((res:any)=>{
    alert(res.message)
    this.addCmntReply.replyText ='';
    
  })
}
deleteCommentReply(replyId:number,commentId:number){
  this.httpService.deleteReply(replyId).subscribe((res:any)=>alert(res.message))

  this.getCmntReply[commentId] = this.getCmntReply[commentId].filter(cr=>cr.reply_Id!==replyId)
}
getUserPfpByUsername()
{
  this.httpService.getUserPfp(this.user.username).subscribe((res:any)=>this.pfpUrl=res.url)
}

}
