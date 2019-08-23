import { Injectable } from '@angular/core';
import { IEmployee } from './login/login.interface';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Injectable()
export class EmployeeService {
   
    constructor(private _http: HttpClient) {

    }

    public url = "http://localhost:3000";

    getEmployees(): Observable<IEmployee[]> {
        return this._http.get<IEmployee[]>('http://localhost:3000/getEmployees');
    }

    registerUser(serviceName : string, userData): Observable<any> {
        return this._http.post(this.url + serviceName, userData).pipe(
            map((response: Response)=> {
                return response;
            }, (error : Response) => {
                console.log(error);
            })
        )
    }
}