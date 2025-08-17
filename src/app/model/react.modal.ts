
export enum React{
 Like = 0,
 Dislike=1
}
export const ReactType =
[
    {key:0,value:'Like'},
    {key:1,value:'Dislike'}
]

export class PostReact{
    postLikes : number
    postDislikes: number
    user_Id: number
    react_Id:number


    /**
     *
     */
    constructor() {
       this.postDislikes=0,
       this.postLikes=0,
       this.user_Id=0
       this.react_Id=0
        
    }
}