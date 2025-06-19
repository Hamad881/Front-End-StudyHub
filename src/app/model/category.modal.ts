export interface ICategoryList{
    cat_Name: string 
    cat_Id:number 
}
export class GetCategory{
    cat_Name:string;
    cat_Id:number
    /**
     *
     */
    constructor() {
        this.cat_Name='';
        this.cat_Id=0;
    }
}