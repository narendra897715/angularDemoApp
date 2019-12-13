import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
import {EmployeeService} from '../bussinesslogic.service';
import {DomSanitizer} from '@angular/platform-browser';
import {Imessage, IfriendsList} from '../message.inteface';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalComponentComponent} from './modal-component/modal-component.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host : {'class': 'viewport'}
})
export class HomeComponent implements OnInit {
  @ViewChild("chatdiv",{static: false}) divView: ElementRef;
  message : Imessage = {messageContent : '', sentById : 0, sendToId: 0};
  messageText : string;
  existingMessages : Imessage[] = [];
  newMessages : Imessage[] = [];
  friendsList : IfriendsList[] = [];
  selectedFriendDetails : IfriendsList = {emailId: "", name :"", imagePath :"", id: 0};
  showWelcomePage : boolean = true;
  showmenu : boolean = false;
  constructor(public empService : EmployeeService, private sanitizer: DomSanitizer, private router: Router, private modalService: NgbModal) { }

  ngOnInit() {
    if(this.empService.userData.id) {
      this.empService.establishSocketConnection();
    
      this.empService.getMessages().subscribe((message)=>{
        this.existingMessages.push(message);
        this.newMessages.push(message);
      });
      // this.empService.receiveLocation().subscribe((location)=>{
      //   console.log(location);
      // })
      this.getFriendsList();
    } else if(sessionStorage.getItem('userId')) {
     this.getLoggedInUserDetails()     
    } else {
      this.router.navigate(['login']);
    }
  
  }
  
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl("http://localhost:3000/" + url);
  }

  logout() {
    const modalRef = this.modalService.open(ModalComponentComponent);
    modalRef.componentInstance.my_modal_title = 'Logout';
    modalRef.componentInstance.my_modal_content = 'Are you sure you want to logout?';
  }

  showOrHideMenu() {
   this.showmenu = !this.showmenu;
  }

  getLoggedInUserDetails() {
    this.empService.getMethod('/users/getUserDetails', {loginId : sessionStorage.getItem('userId')}).subscribe((data)=>{
      this.empService.userData = data;
      this.empService.establishSocketConnection();
    
      this.empService.getMessages().subscribe((message)=>{
        console.log(this.selectedFriendDetails.id);
        console.log(message.sentById);
        if(this.selectedFriendDetails.id === message.sentById || this.selectedFriendDetails.id === message.sendToId) {
          this.existingMessages.push(message);
          this.newMessages.push(message);
        }
       
      });
      this.getFriendsList();
  })
  };

  getFriendsList() {
    this.empService.getMethod('/users/getFriendslist', {loginId : this.empService.userData.id}).subscribe((friendsList)=>{
        this.friendsList = friendsList;        
    })
  }
  
  sendMessage() {
    this.message.messageContent = this.messageText;
    this.message.sentById = this.empService.userData.id;
    this.message.sendToId = this.selectedFriendDetails.id;
    this.empService.sendMessageToServer(this.message);
    this.empService.postMethod('/users/saveMessages', this.message).subscribe((data)=>{
      this.newMessages = [];
      })
    this.messageText = "";
  }

  saveSelectedFriendName(data) {
    // if(this.newMessages.length !== 0) {
    //   this.empService.postMethod('/users/saveMessages', this.newMessages).subscribe((data)=>{
    //     this.newMessages = [];
    //     })
    // }
    var params = {sentById : this.empService.userData.id, sendToId: data.id};
    this.empService.postMethod('/users/fetchMessages', params).subscribe((data)=>{
      this.existingMessages = data;
      var element  = this.divView.nativeElement;
      element.scrollTop  = element.scrollHeight
     })
    this.showWelcomePage = false;
    this.selectedFriendDetails = data;
    
    
  }

  // sendlocation() {
  //   navigator.geolocation.getCurrentPosition((position)=>{
  //     this.location.latitude = position.coords.latitude;
  //     this.location.longitude = position.coords.longitude;
  //      this.empService.sendMyCurrentLocation(this.location);
  //   })
  // }
}
