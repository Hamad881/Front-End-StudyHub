import { Component,Input, OnInit, inject } from '@angular/core';
import { HttpService } from '../services/http.service';
import { PostReact, React } from '../model/react.modal';

@Component({
  selector: 'app-react',
  imports: [],
  templateUrl: './react.component.html',
  styleUrl: './react.component.css'
})
export class ReactComponent implements OnInit{
httpService=inject(HttpService)
postReact: PostReact =new PostReact()
isReact:boolean=false;

@Input() post_Id:number = 0 ;

ngOnInit(){
  this.getPostReact();
}
  addReact( react:any )
{

  var reactObj ={
    react: react as React
  }
 this.httpService.addReactByPostId(this.post_Id,reactObj).subscribe((res:any)=>{
  alert(res.message)
  this.getPostReact();
  this.isReact=true;
 })
 
}
getPostReact(){
  this.httpService.getReactByPostId(this.post_Id).subscribe((res:any)=> this.postReact = res)
}
removePostReact(){
  this.httpService.removeReactById(this.postReact.react_Id).subscribe((res:any)=>{
    alert(res.message)
    this.getPostReact();
    this.isReact=false;
  })
}
onReact(react:any){
  if(this.isReact==false){
    this.addReact( react );
    
  }
  else{
    this.removePostReact();
    
  }
}
}
