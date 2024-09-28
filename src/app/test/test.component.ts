import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css',
})

export class TestComponent implements OnInit {

  public name = "stefans web";
  public success = false;
  public success2 = false;
  public hasError = false;
  public inputDisabled = false;
  public ipValue = 3;

  public employees$: Observable<IEmployee[]> = new Observable;

  constructor(private _employeeService: EmployeeService)
  {
  }
  ngOnInit(): void {
    this.employees$ = this._employeeService.getEmployees();
    console.log(this.employees$);
  }

  public someStyles = {
    fontStyle: "italic",
    color: "orange",
    background: "yellow"
  }

  onClickClicker(event: any){
    console.log(event);
    this.inputDisabled = !this.inputDisabled;
  }
  get messageClasses() {
    return {
      'text-success': this.success,
      'text-success2': this.success2,
      'text-danger': this.hasError
    };
  }

  onAddNumber(numberToAdd: number) {
    console.log(numberToAdd)    
    this.hasError = this.ipValue == 7;
    this.success = this.ipValue > 5 && this.ipValue !== 7;
    this.success2 = this.ipValue < 5 && this.ipValue !== 0;
    this.ipValue = 0;    
  }
}

export interface IEmployee {
  id: number;
  name: string;
  age: number;
}