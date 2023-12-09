import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReminderComponent } from './reminder.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ReminderComponent
  ],
  imports: [
    CommonModule,
	RouterModule.forChild([{path:"",component:ReminderComponent}])
  ],
  exports:[
	ReminderComponent
  ]
})
export class ReminderModule { }
