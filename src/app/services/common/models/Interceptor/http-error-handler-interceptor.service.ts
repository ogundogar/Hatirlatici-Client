import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPositionType } from 'src/app/services/ui/toastr/custom-toastr.service';
import { AuthLoginService } from '../AuthService/AuthLogin.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor{

constructor(
	private toastrService:CustomToastrService,
	private router: Router,
	private authLoginService:AuthLoginService
	) { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
	return next.handle(req).pipe(catchError(error=>{
	switch(error.status){
		case HttpStatusCode.Unauthorized:
			this.toastrService.message("Bu işlem için yetkiniz bulunmamaktadı...","HATA",{
				MessageType:ToastrMessageType.Error,
				position:ToastrPositionType.TopRight
			})
			this.authLoginService.refreshTokenLogin(localStorage.getItem("refreshToken")).then(data=>{
			});
			break;
		case HttpStatusCode.BadRequest:
			this.toastrService.message("Geçersiz işlem gerçekleştirmeye çalıştınız...","HATA",{
				MessageType:ToastrMessageType.Error,
				position:ToastrPositionType.TopRight
			})
			break;
		case HttpStatusCode.NotFound:
			this.toastrService.message("Sayfa bulunamadı...","HATA",{
				MessageType:ToastrMessageType.Error,
				position:ToastrPositionType.TopRight
			})
			break;
		case HttpStatusCode.InternalServerError:
			this.toastrService.message("Sunucuya erişilemiyor...","HATA",{
				MessageType:ToastrMessageType.Error,
				position:ToastrPositionType.TopRight
			})
			break;
		default:
			this.toastrService.message("Beklenmeyen bir hata oluştu lütfen daha sonra deneyiniz...","HATA",{
				MessageType:ToastrMessageType.Error,
				position:ToastrPositionType.TopRight
			})
			break;
	}
	return of(error);
	}));
	}
}
