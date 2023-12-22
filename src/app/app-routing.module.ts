import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './admin/layout/layout.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { HomeComponent } from './ui/components/home/home.component';
import { authGuard } from './guards/common/auth.guard';

const routes: Routes = [
	{path:"admin",component:LayoutComponent,children:[
		{path:"",component:DashboardComponent,canActivate:[authGuard]},
		{path:"users",loadChildren:()=>import("./admin/components/users/users.module").then(module=>module.UsersModule),canActivate:[authGuard]},
		{path:"groups",loadChildren:()=>import("./admin/components/groups/groups.module").then(module=>module.GroupsModule),canActivate:[authGuard]},
		{path:"reminder",loadChildren:()=>import("./admin/components/reminder/reminder.module").then(module=>module.ReminderModule),canActivate:[authGuard]},
	],canActivate:[authGuard]},
	{path:"",component:HomeComponent},
	{path:"groups",loadChildren:()=>import("./ui/components/groups/groups.module").then(module=>module.GroupsModule)},
	{path:"reminder",loadChildren:()=>import("./ui/components/reminder/reminder.module").then(module=>module.ReminderModule)},
	{path:"users",loadChildren:()=>import("./ui/components/users/users.module").then(module=>module.UsersModule)},
	{path:"register",loadChildren:()=>import("./ui/components/register/register.module").then(module=>module.RegisterModule)},
	{path:"login",loadChildren:()=>import("./ui/components/login/login.module").then(module=>module.LoginModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
