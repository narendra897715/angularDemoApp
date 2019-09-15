import { Injectable } from '@angular/core';
import { IEmployee } from './login/login.interface';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import * as io from 'socket.io-client';
@Injectable()
export class EmployeeService {
   
   
    public socket;
    public url = "http://localhost:3000";

    constructor(private _http: HttpClient) {
        
      }

     establishSocketConnection() {
        this.socket = io(this.url);
        this.socket.on('welcome',()=>{
            console.log('message from serve');
        });
     };

     sendMessageToServer(message) {
         this.socket.emit('sendMessage', message);
         
     };

     getMessages() {
        return Observable.create((observer) => {
            this.socket.on('newMessage', (message) => {
                observer.next(message);
            });
        });
     }

     receiveLocation() {
        return Observable.create((observer) => {
            this.socket.on('receiveLocation', (location) => {
                observer.next(location);
            });
        });
     }

     sendMyCurrentLocation(location : object) {
        this.socket.emit('sendLocation', location);
     }

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