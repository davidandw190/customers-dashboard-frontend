import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private readonly serverUrl: string = 'http://localhost:8080'

  constructor(private http: HttpClient) { }

  //// NON-REACTIVE APPROACH
  // getUser(name: string = '', page: number = 0, size: number = 0): Observable<any> {
  //   return this.http.get<any>(`${this.serverUrl}/users?name=${name}&page=${page}&size=${size}`)
  // }

  users$ = (name: string = '', page: number = 0, size: number = 10): Observable<any> =>
    this.http.get<any>(`${this.serverUrl}/users?name=${name}&page=${page}&size=${size}`);

}


