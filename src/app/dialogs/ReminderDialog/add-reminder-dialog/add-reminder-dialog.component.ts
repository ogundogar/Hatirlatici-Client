import { Component, Inject } from '@angular/core';
import { BaseDialog } from '../../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReminderService } from 'src/app/services/common/models/ReminderService/reminder.service';
import { ReminderByDate } from 'src/app/contracts/Reminder/ReminderByDate';
import { CustomToastrService, ToastrMessageType, ToastrPositionType } from 'src/app/services/ui/toastr/custom-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';


@Component({
  selector: 'app-add-reminder-dialog',
  templateUrl: './add-reminder-dialog.component.html',
  styleUrls: ['./add-reminder-dialog.component.css']
})
export class AddReminderDialogComponent extends BaseDialog<AddReminderDialogComponent> {
	formData = {
		title: '',
		description: '',
		date:`${this.data.year}/${this.data.month}/${this.data.day}`
	};

	constructor(dialogRef:MatDialogRef<AddReminderDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data:AddReminderDiaologState,
		private reminderService:ReminderService,
		private toastrService:CustomToastrService,
		private spinner:NgxSpinnerService){
		super(dialogRef);
	}

	addReminder():void{
		const reminder:ReminderByDate=new ReminderByDate();
			reminder.Name=this.formData.title;
			reminder.Description=this.formData.description;
			reminder.Date=this.formData.date;
			this.spinner.show(SpinnerType.LineSpinFade);

			this.reminderService.post(reminder,()=>{
			this.spinner.hide(SpinnerType.LineSpinFade)
			this.toastrService.message("Reminder kaydedildi...","Başarılı",{
				position:ToastrPositionType.TopRight,
				MessageType:ToastrMessageType.Success
			});},
			()=>{
				this.spinner.hide(SpinnerType.LineSpinFade);
				this.toastrService.message("Reminder kaydedilirken hata oluştu...","Hata!",{
					position:ToastrPositionType.TopRight,
					MessageType:ToastrMessageType.Error
				});
			})
	}
}
export interface AddReminderDiaologState{
	day:number;
	month:number;
	year:number;
}
