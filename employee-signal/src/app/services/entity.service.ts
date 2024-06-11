import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entity } from '../models/entity.models';

@Injectable({
  providedIn: 'root',
})
export class EntityService {
  private readonly url = 'http://localhost:4000/entities';

  constructor(private http: HttpClient) {}

  getEntities(): Observable<Entity[]> {
    return this.http.get<Entity[]>(`${this.url}`);
  }

  getEntityById(id: number | null): Observable<Entity> {
    return this.http.get<Entity>(`${this.url}/${id}`);
  }

  createEntity(entity: Entity): Observable<Entity> {
    return this.http.post<Entity>(`${this.url}`, { entity });
  }

  // PUT http://localhost:4000/employees/{id}
  updateEntityById(entity: Entity): Observable<Entity> {
    return this.http.put<Entity>(`${this.url}/${entity.id}`, { entity });
  }

  // DELETE http://localhost:4000/employees/{id}
  deleteEntityById(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }
}
