import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  host : {'class': 'viewport'}
})
export class LoginComponent implements OnInit {
  
  firstName : string = "Narendra";
  lastName : string = "vemula" ;
  employees : any[];
  selectedValueFromChild : string = "All";
  constructor() { }

  ngOnInit() {
    this.employees = [
      {
          code: 'emp101', name: 'Tom', gender: 'Male',
          annualSalary: 5500, dateOfBirth: 583180200000
      },
      {
          code: 'emp102', name: 'Alex', gender: 'Male',
          annualSalary: 5700.95, dateOfBirth: 583180200000
      },
      {
          code: 'emp103', name: 'Mike', gender: 'Male',
          annualSalary: 5900, dateOfBirth: 583180200000
      },
      {
          code: 'emp104', name: 'Mary', gender: 'Female',
          annualSalary: 6500.826, dateOfBirth: 583180200000
      },
  ];
  }

 getTotalEmployeeCount() : number {
    return this.employees.length;
 }

 getTotalMaleEMployeeCount() : number {
   return this.employees.filter(e => e.gender === 'Male').length;
 }

 getTotalFeMaleEMployeeCount() : number {
  return this.employees.filter(e => e.gender === 'Female').length;
}

  getFullName() {
    return this.firstName + '' + this.lastName;
    }

  trackByFunction(index: number, employee) : string {
    return employee.code;
  }

  changedInChildComponent(value: string) : void {
        this.selectedValueFromChild = value;
  }

}
