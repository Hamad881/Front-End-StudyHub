import { Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { RegistrationComponent } from './login/registration/registration.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { UserprofileComponent } from './userprofile/userprofile.component';

export const routes: Routes = [
    {
        path:'',
        pathMatch:'full',
        loadComponent: ()=>{
        return import('./login/sign-in/sign-in.component').then(m=>m.SignInComponent)
    }},
    // {
    //     path:"home",
    //     component:HomeComponent
    // },
    {
        path:"sign-in",
        component:SignInComponent
    },{
        path:"registration",
        component:RegistrationComponent
    },{
        path:"",
        component:LayoutComponent,
        children:[
            {
                path:"home",
                component:HomeComponent
            },
            {
                path:"profile",
                component:ProfileComponent
            },
            {
                path:"userprofile",
                component:UserprofileComponent
            }
        ]
    },

];
