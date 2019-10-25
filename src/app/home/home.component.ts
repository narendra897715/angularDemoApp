import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../bussinesslogic.service';
import {DomSanitizer} from '@angular/platform-browser';
import {Imessage, IfriendsList} from '../message.inteface';
import {Router} from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host : {'class': 'viewport'}
})
export class HomeComponent implements OnInit {

  message : Imessage = {message : '', sentById : 0};
  messageText : string;
  messages : Imessage[] = [];
  friendsList : IfriendsList[] = [];
  // friends = [{imagePath: "nandu.png", name : "Nandu"},{imagePath: 'http://localhost:3000/vamshi.gif', name : "Vamshi"}];
  location = {
    latitude : 0,
    longitude : 0
  };

  constructor(public empService : EmployeeService, private sanitizer: DomSanitizer, private router: Router) { }

  ngOnInit() {
    if(this.empService.userData.id) {
      this.empService.establishSocketConnection();
    
      this.empService.getMessages().subscribe((message)=>{
        this.messages.push(message);
      });
      // this.empService.receiveLocation().subscribe((location)=>{
      //   console.log(location);
      // })
      this.getFriendsList();
    } else if(localStorage.getItem('userId')) {
     this.getLoggedInUserDetails();

      
    } else {
      this.router.navigate(['login']);
    }
  
  }
  
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl("http://localhost:3000/" + url);
  }

  getLoggedInUserDetails() {
    this.empService.getDetails('/users/getUserDetails', {loginId : localStorage.getItem('userId')}).subscribe((data)=>{
      this.empService.userData = data;
      this.empService.establishSocketConnection();
    
      this.empService.getMessages().subscribe((message)=>{
        this.messages.push(message);
      });
      this.getFriendsList();
  })
  };

  getFriendsList() {
    this.empService.getDetails('/users/getFriendslist', {loginId : this.empService.userData.id}).subscribe((friendsList)=>{
        this.friendsList = friendsList;
    })
  }
  
  sendMessage() {
    this.message.message = this.messageText;
    this.message.sentById = this.empService.userData.id;
    this.empService.sendMessageToServer(this.message);
    this.messageText = "";
  }

  sendlocation() {
    navigator.geolocation.getCurrentPosition((position)=>{
      this.location.latitude = position.coords.latitude;
      this.location.longitude = position.coords.longitude;
       this.empService.sendMyCurrentLocation(this.location);
    })
  }
}
