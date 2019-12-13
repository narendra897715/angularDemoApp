import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppMaterialModule} from './app.material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {employeeTitle} from './employeeTitle.pipe';
import {formatDate} from './formatDate.pipe';
import { EmployeeCountComponent } from './employee-count/employee-count.component';
import {HttpClientModule} from '@angular/common/http';
import {EmployeeService} from './bussinesslogic.service';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ModalComponentComponent } from './home/modal-component/modal-component.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    employeeTitle,
    formatDate,
    EmployeeCountComponent,
    RegisterComponent,
    HomeComponent,
    ModalComponentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    NgbModule
  ],
  entryComponents:[
    ModalComponentComponent
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
