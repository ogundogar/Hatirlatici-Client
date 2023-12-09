import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersModule } from './users/users.module';
import { ReminderModule } from './reminder/reminder.module';
import { GroupsModule } from './groups/groups.module';
import { HomeModule } from './home/home.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
	UsersModule,
	ReminderModule,
	GroupsModule,
	HomeModule
  ]
})
export class ComponentsModule { }
