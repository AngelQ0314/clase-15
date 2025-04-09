import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';


@Injectable()
export class peticionInterceptor implements HttpInterceptor {

  constructor(private router:Router){}
  intercept(req: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Request URL' + req.url)

    let peticion = req.clone({
      setHeaders: {
        'Accept': 'application/json',
        'Authorization': 'Bearer GciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJwQGhtLmNvbSIsImlkIjoxLCJpYXQiOjE3NDQxNTk5MjQsImV4cCI6MTc0NDE2MDgwNH0.CVIhPeLcCGix60M1JlLrIbW3jHCGdba595_BbL7fj-o'
      }
    })
    return handler.handle(peticion).pipe(tap(()=>{},

      (error:any)=>{
        console.log("EROOOORRR")
        if (error instanceof HttpErrorResponse) {
          if (error.status!== 401) {
            return
          }
          this.router.navigate(["auth/login"])
        }
      }
    ))
  }
};
