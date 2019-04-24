import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { mapKeys, camelCase } from 'lodash';
@Injectable()
export class RequestHttpInterceptor implements HttpInterceptor {
    constructor() { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next
            .handle(req)
            .pipe(
                map((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        if (Array.isArray(event.body)) {
                            const camelBody = [];
                            event.body.map(b => mapKeys(b, (_, k) => camelCase(k)));

                            const modEvent = event.clone({ body: event.body });
                            return modEvent;
                        } else {
                            const camelCaseObject = mapKeys(event.body, (_, k) => camelCase(k));
                            const modEvent = event.clone({ body: camelCaseObject });
                            return modEvent;
                        }

                    }
                })
            );
    }
}

