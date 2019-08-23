import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

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

    @Input()
    changeName : string;

    @Output()
    countEmployeeEventEmitter : EventEmitter<string> = new EventEmitter<string>();


  constructor() { }

  ngOnInit() {
    
  }

  ngOnChanges(changeValue: SimpleChanges) {
    for(let propertyName in changeValue) {
      let change = changeValue[propertyName];
      let current = JSON.stringify(change.currentValue);
      let previous = JSON.stringify(change.previousValue);
      console.log(propertyName + ': currentValue =' + current + ': previousValue =' + previous);
    }
  }

  radioButtonChanged() {
    this.countEmployeeEventEmitter.emit(this.selectedRadioButtonValue);
  }

}
