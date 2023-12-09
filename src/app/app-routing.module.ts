import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './admin/layout/layout.component';
import { UiModule } from './ui/ui.module';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { HomeComponent } from './ui/components/home/home.component';
import { GroupsComponent } from './admin/components/groups/groups.component';

const routes: Routes = [
	{path:"admin",component:LayoutComponent,children:[
		{path:"",component:DashboardComponent},
		{path:"users",loadChildren:()=>import("./admin/components/users/users.module").then(module=>module.UsersModule)},
		{path:"groups",loadChildren:()=>import("./admin/components/groups/groups.module").then(module=>module.GroupsModule)},
		{path:"reminder",loadChildren:()=>import("./admin/components/reminder/reminder.module").then(module=>module.ReminderModule)},
	]},
	{path:"",component:HomeComponent},
	{path:"groups",loadChildren:()=>import("./ui/components/groups/groups.module").then(module=>module.GroupsModule)},
	{path:"reminder",loadChildren:()=>import("./ui/components/reminder/reminder.module").then(module=>module.ReminderModule)},
	{path:"users",loadChildren:()=>import("./ui/components/users/users.module").then(module=>module.UsersModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
