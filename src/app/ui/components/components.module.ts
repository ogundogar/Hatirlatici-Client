import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersModule } from './users/users.module';
import { ReminderModule } from './reminder/reminder.module';
import { GroupsModule } from './groups/groups.module';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
	UsersModule,
	ReminderModule,
	GroupsModule,
	HomeModule,
	//LoginModule
  ]
})
export class ComponentsModule { }
