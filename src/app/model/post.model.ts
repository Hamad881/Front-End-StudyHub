export class AddPost{
data: string;
cat_Id: number;
/**
 *
 */
constructor() {
    this.data ='';
    this.cat_Id = 0;
    
}
}
export class GetAllPost{
    post_Id: number;
    data: string;
    cat_Id: number;
    name: string;
    cat_Name: string;
    dateCreated: Date;
    user_Id:number;
    likes:number;
    dislikes:number;
    react_Id:number;
    username:string;

    /**
     *
     */
    constructor() {
        this.post_Id= 0;
       this.data='';
       this.cat_Id=0;
       this.cat_Name='';
       this.name='';
       this.dateCreated= new Date();
       this.user_Id=0;
       this.dislikes=0;
       this.likes=0;
       this.react_Id=0;
       this.username=''

        
    }
}
export class UpdatePost{
    cat_Id:number;
    data:string;
/**
 *
 */
constructor() {
   this.cat_Id=0;
   this.data=''
    
}
}