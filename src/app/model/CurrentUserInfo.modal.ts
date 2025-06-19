export class CurrentUserInfo {
    phone : string;
    country: string;
    name: string;
    email: string;
    address: string;
    education: string;
    username: string;
    aboutInfo:string;
   

    /**
     *
     */
    constructor() {
      this.phone= '';
      this.address='';
      this.education='';
      this.name='';
      this.username='';
      this.country='';
      this.email='';
      this.aboutInfo='';
      
        
    }
}
export class CurrentUserId{
  user_Id:number;
 
  constructor() {
   this.user_Id=0;
    
  }
}