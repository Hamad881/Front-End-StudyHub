export interface IGetComment{
    comment_Id:number;
    comment_text:string;
    userName:string;
    created_At:Date;
    user_Id:number;

   

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
userName:string;
replyText:string;


}
export class AddCommentReply{
    isReply:boolean;
    commentId:number;
    replyText:string;

    /**
     *
     */
    constructor() {
      this.commentId=0;
      this.replyText='';
      this.isReply=false;
    }
}