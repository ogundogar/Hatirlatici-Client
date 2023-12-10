import { Component, Input } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { HttpClientService } from '../../../HttpClient/http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AlertifyService, MessageType, PositionType } from 'src/app/services/admin/alertify/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPositionType } from 'src/app/services/ui/toastr/custom-toastr.service';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadDialogComponent, FileUploadDialogState } from 'src/app/dialogs/fileUploadDialog/file-upload-dialog/file-upload-dialog.component';
import { DialogService } from '../../../dialog.service';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
	public files: NgxFileDropEntry[];
	public postFile:NgxFileDropEntry[];
	@Input() options: Partial<FileUploadOptions>;

	constructor(
		private spinner:NgxSpinnerService,
		private httpClientService:HttpClientService,
		private alertifyService:AlertifyService,
		private customToastrService:CustomToastrService,
		private dialog:MatDialog,
		private dialogService:DialogService,
		){}

	public selectedFiles(files: NgxFileDropEntry[]) {
	  this.files = files;
	  const fileData:FormData = new FormData();
	  for(const file of files){
		(file.fileEntry as FileSystemFileEntry).file((_file:File)=>{
			fileData.append(_file.name,_file,file.relativePath);
		});
	}
	this.dialogService.openDialog({
		componentType:FileUploadDialogComponent,
		data:FileUploadDialogState.Yes,
		afterClosed : ()=>{
			this.spinner.show(SpinnerType.Cog);
			this.httpClientService.post({
			controller:this.options.controller,
			action:this.options.actions,
			queryString:this.options.queryString,
			headers:new HttpHeaders({"responseType":"blob"})
		}, fileData).subscribe(
			data=>{
				const message: string = "Dosyalar başarıyla yüklenmiştir.";
				this.postFile=this.files;
				if (this.options.isAdminPage) {
					this.spinner.hide(SpinnerType.Cog);
				  this.alertifyService.message(message,
					{
					  messageType: MessageType.success,
					  position: PositionType.TopRight,
					}
					
					)
				} else {
					this.spinner.hide(SpinnerType.LineSpinFade);
				  this.customToastrService.message(message, "Başarılı.", {
					MessageType: ToastrMessageType.Success,
					position: ToastrPositionType.TopRight
				  })
				}
			},
			(errorResponse:HttpErrorResponse)=>{
				const message: string = "Dosyalar yüklenirken beklenmeyen bir hatayla karşılaşılmıştır.";
	
				if (this.options.isAdminPage) {
					this.spinner.hide(SpinnerType.Cog);
					this.alertifyService.message(message,
					{
					  messageType: MessageType.error,
					  position: PositionType.TopRight
					})
				} else {
					this.spinner.hide(SpinnerType.LineSpinFade);
				  this.customToastrService.message(message, "Başarsız.", {
					MessageType: ToastrMessageType.Error,
					position: ToastrPositionType.TopRight,
				  })
				}
			}
		)},
		options:{width:"250px"}
	})
}
}
export class FileUploadOptions{
		controller?:string;
		actions?:string;
		queryString?:string;
		explanation?:string;
		accept?:string;
		isAdminPage?:boolean=false;
}
