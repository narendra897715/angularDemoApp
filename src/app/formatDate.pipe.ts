import {Pipe,PipeTransform } from '@angular/core';
@Pipe({
    name : 'formatDate'
})
export class formatDate implements PipeTransform {
      transform(value: number) : string {
        var todayTime = new Date(value);
        var month = this.formatwithzero(todayTime.getMonth() + 1);
        var day = this.formatwithzero(todayTime.getDate());
        var year = todayTime.getFullYear();    
        return month + "/" + day + "/" + year;
      }

      

      formatwithzero(value: number): any {
        if(value <= 9) {
            return '0' + value ;
        }   else {
            return value;
        }
      }
}