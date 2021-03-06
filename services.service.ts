import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
const baseUrl = 'http://localhost:8080/api/userinformation';
@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private _http: HttpClient) { }
  createUser(val){
    return this._http.post<any>(`${baseUrl}/create`,{data:val},{withCredentials:true})
   .pipe( 
      map(
        (res)=> { //console.log(res)
          return res['status']; 
        }),
        catchError(this.handleError)
    ); 
  }

  onLogin(user,pass){
   return this._http.post<any>(`${baseUrl}/getuser`,{useremail:user,password:pass},{withCredentials:true})
   .pipe( 
      map(
        (res)=> { //console.log(res)
          return res['status']; 
        }),
        catchError(this.handleError)
    ); 
  };

  uploadImage(image){
    return this._http.post(`${baseUrl}/file`,image,{withCredentials:true})
    .pipe( 
       map(
         (res)=> { //console.log(res)
           return res; 
         }),
         catchError(this.handleError)
     ); 
  }
  onLogout(){
    return this._http.get(`${baseUrl}/logout`,{withCredentials:true})
    .pipe( 
       map(
         (res)=> { console.log(res['message'])
           return res['message']; 
         }),
         catchError(this.handleError)
     ); 
  }

  getCredentials(){
    return this._http.get<any>(`${baseUrl}/getcredentials`)
    .pipe( 
       map(
         (res)=> { //console.log(res)
           return res; 
         }),
         catchError(this.handleError)
     ); 
  }
  deleteMoment(id){
    return this._http.post<any>(`${baseUrl}/deletemoment`,{id:id},{withCredentials:true})
    .pipe( 
       map(
         (res)=> { //console.log(res)
           return res['status']; 
         }),
         catchError(this.handleError)
     ); 
  }
  deleteUser(id){
    return this._http.get<any>(`${baseUrl}/deleteuser/${id}`,{withCredentials:true})
    .pipe( 
       map(
         (res)=> { //console.log(res)
           return res['status']; 
         }),
         catchError(this.handleError)
     ); 
  }
  editUser(form,id){
    return this._http.post<any>(`${baseUrl}/edituser`,{form:form, id:id},{withCredentials:true})
    .pipe( 
       map(
         (res)=> { //console.log(res)
           return res['status']; 
         }),
         catchError(this.handleError)
     ); 
  }
  private handleError(error: HttpErrorResponse){
    //console.log(error)
    return throwError(error);
  }
}
