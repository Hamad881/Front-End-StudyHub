import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddPost } from '../model/post.model';
import { Observable } from 'rxjs';
import { CurrentUserInfo } from '../model/CurrentUserInfo.modal';
import { AddComment } from '../model/comment.modal';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  apiUrl="https://localhost:7080/api/"
 

  constructor(private http:HttpClient) { }

  getCategory(){
    return this.http.get(this.apiUrl+ 'Cat')
  }
  addPost(obj:AddPost){
    return this.http.post(this.apiUrl+'Post/Add',obj);

  }
  getCurrentUserPost(){
    return this.http.get(this.apiUrl +'Post/UserOnly');
  }
  getCurrentUserInfo(){
    return this.http.get(this.apiUrl +'Auth/userinfo');
  }
  editUserInfo(userObj : CurrentUserInfo){
    return this.http.put(this.apiUrl+"Auth/updateInfo",userObj);
  }
  getPostComment(postId:number){
    let params = new HttpParams()
    .set('postId', postId.toString())
    return this.http.get(this.apiUrl+'Comment/getcomments', {params})
  }
  getCommentReply(commentId:number){
    let params = new HttpParams ()
    .set('commentId',commentId.toString())
    return this.http.get(this.apiUrl+'CommentReply/getcommentreply',{params})
  }
  addComment(obj:AddComment){
    return this.http.post(this.apiUrl+'Comment/AddComment',obj);
  }
  getUserId(){
    return this.http.get(this.apiUrl+'Auth/userId')
  }
  delComment(commentId:number ){
    let params = new HttpParams()
    .set('id',commentId.toString())
    return this.http.delete(this.apiUrl+'Comment/deletecomment',{params})
  }
}
