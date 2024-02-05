import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient) {}

  //crear un usuario
  addUser(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/users', data);
  }

  //obtener listado de usuario
  getUsersList(): Observable<any> {
    return this._http.get('http://localhost:3000/users');
  }

  deleteUser(data: any): Observable<any> {
    return this._http.delete(`http://localhost:3000/users/${data}`);
  }
}
