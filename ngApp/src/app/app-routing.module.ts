import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EventsComponent} from './events/events.component'
import {SpecialEventsComponent} from './special-events/special-events.component'
import {RegisterComponent} from './register/register.component'
import {LoginComponent} from './login/login.component'
import {AuthGuard} from './auth.guard'
import {CreateEventsComponent} from './create-events/create-events.component'


const routes: Routes = [{
  path:'',
  redirectTo:'/events',
  pathMatch:'full'
},{
  path:'events',
  component: EventsComponent
},
{
  path:'createEvents',
  component: CreateEventsComponent
},
{
  path:'special',
  component: SpecialEventsComponent,
  canActivate:[AuthGuard]
},
{
  path:'login',
  component: LoginComponent
},{
    path:'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
