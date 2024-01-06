import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteComponent } from './deleteDialogs/delete/delete.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FileUploadDialogComponent } from 'src/app/dialogs/fileUploadDialog/file-upload-dialog/file-upload-dialog.component';
import { SelectUserImageDialogComponent } from './select-user-image-dialog/select-user-image-dialog.component';
import { FileUploadModule } from '../services/common/file-upload/file-upload.module';
import {MatCardModule} from '@angular/material/card';
import { ReminderDiaologComponent } from './ReminderDialog/reminder-diaolog/reminder-diaolog.component';
import { AddReminderDialogComponent } from './ReminderDialog/add-reminder-dialog/add-reminder-dialog.component';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import { ReminderDeleteDirective } from '../directive/ui/Reminder/reminder-delete.directive';
@NgModule({
  declarations: [
	DeleteComponent,
	FileUploadDialogComponent,
	SelectUserImageDialogComponent,
 ReminderDiaologComponent,
 AddReminderDialogComponent,
 ReminderDeleteDirective
  ],
  imports: [
    CommonModule,
	MatDialogModule,MatCardModule,MatButtonModule,
	FileUploadModule,
	FormsModule,
	MatInputModule,
	MatFormFieldModule,
	MatTableModule
  ],
  exports:[
	DeleteComponent
  ]
})
export class DialogsModule { }
