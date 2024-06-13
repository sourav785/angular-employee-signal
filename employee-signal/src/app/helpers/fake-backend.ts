import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { delay, dematerialize, materialize } from "rxjs/operators";


const entityKey = 'angular-employee-signal';
let entities: any[] = JSON.parse(localStorage.getItem(entityKey)!) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>>{
        const { url, method, headers, body } = request;
        return handleRoute();

        function handleRoute(){
            switch(true){
                case url.endsWith('/entities') && method === 'GET': 
                    return getEntities();
                case url.match(/\/entities\/\d+$/) && method === 'GET': 
                    return getEntitiesById();
                case url.match('/entities') && method ==='POST': 
                    return createEntity();
                case url.match(/\/entities\/\d+$/) && method ==='PUT': 
                    return updateEntity();
                case url.match(/\/entities\/\d+$/) && method === 'DELETE': 
                    return deleteEntity();
                default: return next.handle(request);
            }
        }

        function getEntities() {
            return ok(entities.map((x) => basicDetails(x)));
          }
      
          function getEntitiesById() {
            const entity = entities.find((x) => x.id === idFromUrl());
            return ok(basicDetails(entity));
          }
      
          function createEntity() {
            let entity = { ...body.entity };
      
            if (entities.find((x) => x.email === entity.email)) {
              return error('Email "' + entity.email + '" is already taken');
            }
      
            entity.id = entities.length
              ? Math.max(...entities.map((x) => x.id)) + 1
              : 1;
              
            entities.push(entity);
            localStorage.setItem(entityKey, JSON.stringify(entities));
            return ok(entity);
          }
      
          function updateEntity() {
            let params = body.entity;
            let entity = entities.find((x) => x.id === idFromUrl());
      
            Object.assign(entity, params);
            localStorage.setItem(entityKey, JSON.stringify(entities));
      
            return ok(entity);
          }
      
          function deleteEntity() {
            entities = entities.filter((x) => x.id !== idFromUrl());
            localStorage.setItem(entityKey, JSON.stringify(entities));
            return ok(idFromUrl());
          }
      
          function ok(body?: any) {
            return of(new HttpResponse({ status: 200, body })).pipe(delay(500));
          }
      
          function error(message: string) {
            return throwError(() => ({ error: { message } })).pipe(
              materialize(),
              delay(500),
              dematerialize()
            );
          }
      
          function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
          }
      
          function basicDetails(entity: any) {
            const { id, firstName, lastName, email, mobile, dob, doj } = entity;
            return { id, firstName, lastName, email, mobile, dob, doj };
          }
        }
}