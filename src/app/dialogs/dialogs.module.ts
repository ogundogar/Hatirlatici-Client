import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteComponent } from './deleteDialogs/delete/delete.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FileUploadDialogComponent } from 'src/app/dialogs/fileUploadDialog/file-upload-dialog/file-upload-dialog.component';


@NgModule({
  declarations: [
	DeleteComponent,
	FileUploadDialogComponent
  ],
  imports: [
    CommonModule,
	MatDialogModule,
	MatButtonModule
  ],
  exports:[
	DeleteComponent
  ]
})
export class DialogsModule { }
