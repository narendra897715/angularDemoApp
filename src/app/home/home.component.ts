import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../bussinesslogic.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  message : string;
  messages = [];
  location = {
    latitude : 0,
    longitude : 0
  };

  constructor(public empService : EmployeeService) { }

  ngOnInit() {
    this.empService.establishSocketConnection();
    this.empService.getMessages().subscribe((message)=>{
      this.messages.push(message);
    });
    this.empService.receiveLocation().subscribe((location)=>{
      console.log(location);
    })
  }
  
  sendMessage() {
    
    this.empService.sendMessageToServer(this.message);
    this.message = "";
  }

  sendlocation() {
    navigator.geolocation.getCurrentPosition((position)=>{
      this.location.latitude = position.coords.latitude;
      this.location.longitude = position.coords.longitude;
       this.empService.sendMyCurrentLocation(this.location);
    })
  }
}
