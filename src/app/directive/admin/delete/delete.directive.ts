import { HttpErrorResponse } from '@angular/common/http';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { DeleteComponent, DeleteState } from 'src/app/dialogs/deleteDialogs/delete/delete.component';
import { AlertifyService, MessageType, PositionType } from 'src/app/services/admin/alertify/alertify.service';
import { HttpClientService } from 'src/app/services/common/HttpClient/http-client.service';
import { DialogService } from 'src/app/services/common/dialog.service';

declare var $ : any;
@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective{

  constructor(
	private spinner:NgxSpinnerService ,
	private elementRef:ElementRef,
	private _renderer:Renderer2, 
	private httpClient:HttpClientService,
	public dialog: MatDialog,
	private alertify:AlertifyService,
	private dialogService:DialogService
	){

	const img= _renderer.createElement("img");
	img.setAttribute("src","../../../../../../assets/delete.png");
	img.setAttribute("style", "cursor: pointer;");
    _renderer.appendChild(elementRef.nativeElement, img);

   }

   @Input() id:number;
   @Input() controller:string;
   @Output() refresh :EventEmitter <any>=new EventEmitter();

   @HostListener("click")
	onClick(){
	this.dialogService.openDialog({
		componentType:DeleteComponent,
		data:DeleteState.Yes,
		afterClosed:(async ()=>{
			this.spinner.show(SpinnerType.Cog);
			const td:HTMLTableElement=this.elementRef.nativeElement;
			this.httpClient.delete({controller:this.controller},this.id).subscribe(data=>{
				$(td.parentElement).fadeOut(1000,()=>{
					this.refresh.emit();
					this.alertify.message("Silme işlemi başarılı bir şekilde gerçekleşmiştir.",{messageType:MessageType.success,position:PositionType.TopRight,dissmissOthers:true});
				});
			},(errorResponse:HttpErrorResponse)=>{
				this.spinner.hide(SpinnerType.Cog);
				this.alertify.message("Silme işlemi sırasında hata oluştu",{messageType:MessageType.error,position:PositionType.TopRight,dissmissOthers:true});
			});
		}),
		options:{width:"250px"}
	})
	}

}
