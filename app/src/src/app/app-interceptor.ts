import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable, Provider } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import * as alertify from 'alertifyjs';

import { environment } from '../environments/environment';
 const API_URL = environment.apiURL;

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let reqStream$ = next.handle(req);
    
    return reqStream$.pipe(
      catchError((err) => {
        console.log('I am in Error Interceptor Handler', err.error.message)
        alertify.error(err.error.message);
        return [err];
      })
    );
  }

}

export const appInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AppInterceptor,
  multi: true
};