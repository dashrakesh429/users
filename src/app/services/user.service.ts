import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { userData } from '../model/user.model'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  addUsers(params: any) : Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
          "Accept": "*",
          "Content-Type": "application/json"
      })
    };
    return this.http.post<any>(`${environment.apiUrl}/users/`, params, httpOptions);
  }

  getUsers() : Observable<[userData]> {
    return this.http.get<any>(`${environment.apiUrl}/users/`);
  }

  deleteUser(id: number) : Observable<any>{
    return this.http.delete<any>(`${environment.apiUrl}/users/${id}`);
  }
}
