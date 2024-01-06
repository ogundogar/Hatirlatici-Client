import { Component, Inject } from '@angular/core';
import { BaseDialog } from '../../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogService } from 'src/app/services/common/dialog.service';
import { AddReminderDialogComponent } from '../add-reminder-dialog/add-reminder-dialog.component';
import { ReminderByDate } from 'src/app/contracts/Reminder/ReminderByDate';
import { CustomToastrService, ToastrMessageType, ToastrPositionType } from 'src/app/services/ui/toastr/custom-toastr.service';
import { ReminderService } from 'src/app/services/common/models/ReminderService/reminder.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';


@Component({
  selector: 'app-reminder-diaolog',
  templateUrl: './reminder-diaolog.component.html',
  styleUrls: ['./reminder-diaolog.component.css']
})
export class ReminderDiaologComponent extends BaseDialog<ReminderDiaologComponent> {
	public date:string=`${this.data.year}-${this.data.month}-${this.data.day}`;
	displayedColumns: string[] = ['Title','Description','Edit','Delete'];
	dataSource:any;
	constructor(dialogRef:MatDialogRef<ReminderDiaologComponent>,
		@Inject(MAT_DIALOG_DATA) public data:ReminderDiaologState,
		private dialog:DialogService,
		private toastr:CustomToastrService,
		private reminderService:ReminderService,
		private spinner:NgxSpinnerService){
		super(dialogRef);
	}
	addReminder(){
		this.dialog.openDialog({
			componentType:AddReminderDialogComponent,
			data:{day:this.data.day,month:this.data.month,year:this.data.year},
			options:{
				width:"1000px"
			},
			afterClosed:(async ()=>{
				this.getReminderByDate();
			})
		})
	}
	ngOnInit(){
		this.getReminderByDate();
	}

	async getReminderByDate(){
		this.spinner.show(SpinnerType.LineSpinFade);
		const reminder:{reminder:ReminderByDate[]} = await this.reminderService.getByDate(this.data.year,this.data.month,this.data.day,
		()=>{this.spinner.hide(SpinnerType.LineSpinFade)},
		()=>{this.toastr.message("Hatırlatıcılar getirilirken hata oluştu","Hata",{
			MessageType:ToastrMessageType.Error,position:ToastrPositionType.TopRight});
			this.spinner.hide(SpinnerType.LineSpinFade);
		});
		this.dataSource=reminder;
	}
}
export class ReminderDiaologState {
	day:number;
	month:number;
	year:number;
}
