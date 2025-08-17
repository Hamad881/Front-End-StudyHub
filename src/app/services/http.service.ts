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
  updatePost(id:number,obj:any){
   
    return this.http.put(this.apiUrl+`Post/update/${id}`,obj)
  }
  getPostForUpdate(id:number){
    return this.http.get(this.apiUrl+`Post/byPostId/${id}`)
  }
  delPost(id:number){
    return this.http.delete(this.apiUrl+`Post/delete/${id}`)
  }
  addReply(id:number,obj:any){
    return this.http.post(this.apiUrl+`CommentReply/AddReply/${id}`,obj)
  }
  deleteReply(id:number){
    return this.http.delete(this.apiUrl+`CommentReply/deletecommentreply/${id}`)
  }
  getUserDetailsById(userId:number)
  {
    return this.http.get(this.apiUrl+`Auth/userDetailsById/${userId}`)
  }
  getUserPostById(userId:number)
  {
    return this.http.get(this.apiUrl+`Post/byOtherUserId/${userId}`)
  }
  addReactByPostId(postId:number,obj: any)
  {
    return this.http.post(this.apiUrl+`React/addReact/${postId}`,obj)
  }
  getReactByPostId(postId:number)
  {
    return this.http.get(this.apiUrl+`React/reactCount/${postId}`)
  }
  removeReactById(reactId:number){
    return this.http.delete(this.apiUrl+`React/removeReact/${reactId}`)
  }
  getUserPfp(username:string )
  {
    // let params = new HttpParams()
    // .set('userName',username)
    return this.http.get(this.apiUrl+`AwsFile/userPfp?userName=${encodeURIComponent(username)}`)
  }
  addUserPfp(event:any)
  {
    const file = event.currentTarget.files[0]
    const formData= new FormData()
    formData.append('file',file)
    return this.http.post(this.apiUrl+"AwsFile/upload",formData)
  }
  deleteUserPfp()
  {
    return this.http.delete(this.apiUrl+"AwsFile/delete")
  }

}
