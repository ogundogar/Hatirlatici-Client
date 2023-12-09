import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardModule } from './dashboard/dashboard.module';
import { GroupsModule } from './groups/groups.module';
import { ReminderModule } from './reminder/reminder.module';
import { UsersModule } from './users/users.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
	DashboardModule,
	GroupsModule,
	ReminderModule,
	UsersModule
  ],
  exports:[
	DashboardModule,
	GroupsModule,
	ReminderModule,
	UsersModule
  ]
})
export class ComponentsModule { }
