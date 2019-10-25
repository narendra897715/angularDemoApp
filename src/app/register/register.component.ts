import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {EmployeeService} from '../bussinesslogic.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  host : {'class': 'viewport'}
})
export class RegisterComponent implements OnInit {
  
  registerForm : FormGroup;
  formErrors = {
    firstName : "",
    lastName: "",
    emailId : "",
    password: ""
  };

  validationMessages = {
    firstName : {
      required : "First Name is required"
    },
    lastName : {
      required : "Last Name is required"
    },
    emailId : {
      required : "Email ID is required"
    },
    password : {
      required : "Password is required"
    },
  }
  constructor(private fb : FormBuilder, public busService : EmployeeService,
    private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {

    /* Using FormControl anf FormGroup instances */
    // this.registerForm = new FormGroup({
    //   firstName : new FormControl(),
    //   lastName : new FormControl(),
    //   emailId : new FormControl(),
    //   password : new FormControl()  
    // }) 

    /*using FormBuilder Class */

    this.registerForm = this.fb.group({
      firstName : ['',Validators.required ],
      lastName : ['',Validators.required],
       emailId : ['',Validators.required],
       password : ['',Validators.required]  
    })

    this.registerForm.valueChanges.subscribe(data => {
          this.logValidationMessages(this.registerForm);
    })
  }

  logValidationMessages(group : FormGroup) {
    Object.keys(group.value).forEach((key: string)=>{
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

  onSubmitForm() : void {
    this.busService.getDetails('/addUsers', this.registerForm.value).subscribe((data)=> {
      this._snackBar.open("Registered Successfully", "", {
        duration: 2000,
      });
      this.router.navigate(['login']);
    })
    // console.log(this.registerForm.value);
  };

  onLoadData() : void {
    
  }


}
