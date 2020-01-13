import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { EmployeesModel } from '../models/employee';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http: HttpClient) {}

  findAll() {
    return this.http.get<EmployeesModel>(`${environment.API_URL}employees`).pipe(map(res => res.data));
  }

  getById(id: number) {
    return this.http.get<EmployeesModel>(`${environment.API_URL}employees/${id}`).pipe(map(res => res.data));
  }

  update(user: EmployeesModel) {
    return this.http.put(`${environment.API_URL}update/${user.id}`, user);
  }

  delete(id: number) {
    return this.http.delete(`${environment.API_URL}delete/${id}`);
  }

  create(user: EmployeesModel) {
    return this.http.post(`${environment.API_URL}create`, user);
  }

}
