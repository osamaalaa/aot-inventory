import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { environment } from 'src/environments/environment';


@Injectable()
export class InterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url: any = this.fetchBaseUrlBasedOnHeader(req.headers);
    const urlarr = req.url.split('://')

    if (urlarr.length > 1) {
      req = req.clone({
        url: req.url,
      })
    } else {
      req = req.clone({
        url: url + req.url,
      })
    }

    if (!req.headers.has('Content-Type')) {
      req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') })
    }
    return next.handle(req)
  }


  fetchBaseUrlBasedOnHeader(header:HttpHeaders){
    var resource = header.get('RESOURCE_NAME');
    switch(resource){
      case 'WORKFLOW':{
        header.delete('RESOURCE_NAME')
        return environment.WORKFLOW_API_URL;
      }
      default : return environment.INVENTORY_API_URL; 
    }
  }
}
