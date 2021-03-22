import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API = 'http://localhost:4000/api/order/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) { }

  all(): Observable<any> {
    return this.http.get(API, httpOptions);
  }

  create(data?:any): Observable<any> {
    return this.http.post(API, data);
  }

  findOne(id?:any): Observable<any> {

    return this.http.get(`${API}${id}`);
  }

  update(id?:any, data?:any): Observable<any> {
    return this.http.put(`${API}${id}`, data);
  }

  delete(id?:any): Observable<any> {
    return this.http.delete(`${API}${id}`);
  }
}
