import { Injectable } from '@angular/core';
import { IEmployee } from './test/test.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private _url: string ="assets/data/employees.json"

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<IEmployee[]>{
    return this.http.get<IEmployee[]>(this._url);
  }
}
