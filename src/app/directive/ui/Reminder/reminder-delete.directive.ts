import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { DeleteComponent, DeleteState } from 'src/app/dialogs/deleteDialogs/delete/delete.component';
import { DialogService } from 'src/app/services/common/dialog.service';
import { ReminderService } from 'src/app/services/common/models/ReminderService/reminder.service';
import { CustomToastrService, ToastrMessageType, ToastrPositionType } from 'src/app/services/ui/toastr/custom-toastr.service';

@Directive({
  selector: '[appReminderDelete]'
})
export class ReminderDeleteDirective {
  constructor(private dialogService:DialogService,
	private spinner:NgxSpinnerService, 
	private toastrService:CustomToastrService,
	private reminderService:ReminderService,
	private _renderer:Renderer2,
	private elementRef:ElementRef) { 
	const img= _renderer.createElement("img");
	img.setAttribute("src","../../../../../../assets/delete.png");
	img.setAttribute("style", "cursor: pointer;");
    _renderer.appendChild(elementRef.nativeElement, img);
	}
  @Input() id:number;
  @Output() refresh:EventEmitter <any>=new EventEmitter();

	@HostListener("click")
	onClick(){
		this.dialogService.openDialog({
			componentType:DeleteComponent,
			data:DeleteState.Yes,
			afterClosed:(async ()=>{
				this.spinner.show(SpinnerType.LineSpinFade);
				this.reminderService.delete(this.id);
				this.refresh.emit();
					this.toastrService.message("Silme işlemi başarılı bir şekilde gerçekleşmiştir","Başarılı",{
						MessageType:ToastrMessageType.Success,
						position:ToastrPositionType.TopRight
					});
				this.spinner.hide(SpinnerType.LineSpinFade);
				}),options:{width:"250px"}
			});
		}
}
