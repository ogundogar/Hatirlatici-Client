import { Component, Inject, OnInit, Output } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUploadOptions } from 'src/app/services/common/file-upload/component/file-upload/file-upload.component';
import { UserService } from 'src/app/services/common/models/UserService/user.service';
import { listUserImage } from 'src/app/contracts/List_User_Image';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';

@Component({
  selector: 'app-select-user-image-dialog',
  templateUrl: './select-user-image-dialog.component.html',
  styleUrls: ['./select-user-image-dialog.component.css']
})
export class SelectUserImageDialogComponent extends BaseDialog<SelectUserImageDialogComponent> implements OnInit{
	
	@Output() fileUploadOptions:Partial<FileUploadOptions>={
		actions:"Upload",
		controller:"Users",
		explanation:"Resimleri sürükleyin veya seçiniz...",
		isAdminPage:true,
		accept:".jpg , .pgn , .jpeg, .gif",
		queryString:`id=${this.data}`
	}
	images:listUserImage[];
	
	constructor(dialogRef:MatDialogRef<SelectUserImageDialogComponent>,
	@Inject(MAT_DIALOG_DATA) public data: SelectUserImageState|number,
	private UserSerive:UserService,
	private spinner:NgxSpinnerService,
	){
	super(dialogRef)
	}
	async ngOnInit() {
		this.getImage();
	}
	async deleteImage(imageId:number){
		this.spinner.show(SpinnerType.Cog);
		await this.UserSerive.deleteImage(this.data as number,imageId,()=>{this.spinner.hide(SpinnerType.Cog);});
		this.getImage();
	}

	async getImage(){
		this.spinner.show(SpinnerType.Cog);
		this.images= await this.UserSerive.readImage(this.data as number,()=>
		{this.spinner.hide(SpinnerType.Cog);}
		);
	}
}
export enum SelectUserImageState {
	Yes,
	No
}
