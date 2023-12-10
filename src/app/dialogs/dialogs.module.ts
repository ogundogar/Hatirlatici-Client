import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteComponent } from './deleteDialogs/delete/delete.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FileUploadDialogComponent } from 'src/app/dialogs/fileUploadDialog/file-upload-dialog/file-upload-dialog.component';
import { SelectUserImageDialogComponent } from './select-user-image-dialog/select-user-image-dialog.component';
import { FileUploadModule } from '../services/common/file-upload/file-upload.module';
import {MatCardModule} from '@angular/material/card'; 

@NgModule({
  declarations: [
	DeleteComponent,
	FileUploadDialogComponent,
	SelectUserImageDialogComponent
  ],
  imports: [
    CommonModule,
	MatDialogModule,MatCardModule,MatButtonModule,
	FileUploadModule,
	
  ],
  exports:[
	DeleteComponent
  ]
})
export class DialogsModule { }
