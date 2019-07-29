import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-employee-count',
  templateUrl: './employee-count.component.html',
  styleUrls: ['./employee-count.component.scss']
})
export class EmployeeCountComponent implements OnInit {


    selectedRadioButtonValue : string = "All" ;
    @Input()
    all: number;
    @Input()
    male : number;
    @Input()
    female: number;

    @Output()
    countEmployeeEventEmitter : EventEmitter<string> = new EventEmitter<string>();


  constructor() { }

  ngOnInit() {
    
  }

  radioButtonChanged() {
    this.countEmployeeEventEmitter.emit(this.selectedRadioButtonValue);
  }

}
