import { Component, OnInit } from '@angular/core';
import {IEmployee} from './login.interface';
import {EmployeeService} from '../bussinesslogic.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  host : {'class': 'viewport'}
})
export class LoginComponent implements OnInit  {
  
 
  employees : IEmployee[];
  loginForm : FormGroup;
  selectedValueFromChild : string = "All";
  formErrors = {
    emailid : "",
    password: ""
  }
  validationMessages = {
    emailid : {
      required : "EmailId is required"
    },
    password : {
      required : "password is required"
    }
  }
  verifyData = {
    message : "",
    status : false
  }
  constructor(public empSerive: EmployeeService, private fb: FormBuilder, private router : Router) { }

  ngOnInit() {
       this.loginForm = this.fb.group({
         emailid : ['',Validators.required],
         password : ['', Validators.required]
       })
      this.loginForm.valueChanges.subscribe((data)=>{
        this.loadValidationsMessages(this.loginForm);
      })
  }

   loadValidationsMessages(group : FormGroup = this.loginForm) {
     Object.keys(group.value).forEach((key : string)=> {
      const abstractControl = group.get(key);
      if(abstractControl && abstractControl.invalid && abstractControl.touched) {
        const message = this.validationMessages[key];
        for(const error in abstractControl.errors){
          this.formErrors[key] = message[error];
          console.log(this.formErrors);
        }
      }
     })
       }
  
       onLogin():void {
         this.empSerive.registerUser('/login/verifyUser', this.loginForm.value).subscribe((data)=>{
             this.verifyData.message = data.message;
             this.verifyData.status = data.status;
             if(data.status) {
               this.router.navigate(['home']);
             }
         })
       }




}
