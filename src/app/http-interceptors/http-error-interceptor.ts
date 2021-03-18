import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError  } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { MessageService, TypeEnum } from '../services/message.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private messageService: MessageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
    .pipe(
      // retry(1),
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          console.error('An error occurred:', error.error.message);
          this.messageService.addMessage(TypeEnum.Error, 'A client error has occured while sending a request to the server', JSON.stringify(error.error.message));
        } else {
          console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
          this.messageService.addMessage(TypeEnum.Error, `Error ${error.status} has occured while sending a request to the server`, `${JSON.stringify(error.error)}`);
        }
        
        // Return an observable with a user-facing error message.
        return throwError('Something bad happened; please try again later.');
      })
    );
  }
}