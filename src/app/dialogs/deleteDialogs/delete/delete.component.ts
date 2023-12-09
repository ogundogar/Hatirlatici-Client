import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseDialog } from '../../base/base-dialog';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent extends BaseDialog<DeleteComponent> {
	constructor(
		dialogRef: MatDialogRef<DeleteComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DeleteState) {
		super(dialogRef);
	  }
}
export enum DeleteState {
	Yes,
	No
}
