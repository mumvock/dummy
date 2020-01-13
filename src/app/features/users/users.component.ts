import { Component, OnInit } from '@angular/core';

import { EmployeesService } from 'src/app/services/employee.service';
import { EmployeesModel } from 'src/app/models/employee';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  employees = new Array<EmployeesModel>();

  constructor(private employeesService: EmployeesService) {}

  ngOnInit() {
    this.listUsers();
  }

  listUsers() {
    this.employeesService
    .findAll()
    .subscribe(res => this.employees = res ? res : []);
  }

  editUser(userId: number) {
    // exibir inputs de edição.
  }

  manageUsers(method: string, userId?: number, user?: EmployeesModel) {

    if (method === 'delete') {
      alert('You sure?');
    }

    this.employeesService
      [method](userId ? userId : user)
      .subscribe(
        res => console.log(res),
        error => console.log(error)
      );
  }

}
