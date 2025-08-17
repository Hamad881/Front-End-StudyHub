export interface IGetComment{
    comment_Id:number;
    comment_text:string;
    username:string;
    created_At:Date;
    user_Id:number;
    name:string;

   

}
export class AddComment{
    post_Id:number;
    comment_text:string;

    /**
     *
     */
    constructor() {
        this.post_Id=0;
        this.comment_text='';
        
    }
}
export interface IGetCommentReply{
createdAt:Date;
name:string;
replyText:string;
user_Id:number;
reply_Id:number;
username:string;


}
export class AddCommentReply{
    
    replyText:string;

    /**
     *
     */
    constructor() {
      
      this.replyText='';
     
    }
}