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

        
    }
}