import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
const baseUrl = 'http://localhost:8080/api/userinformation';
@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private _router:Router, private _http:HttpClient){}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(localStorage.getItem('username') && this.sessionCheck()){
        //console.log(localStorage.getItem('username'))
        //this._router.navigate(['home/', { key: 'view' }]);
        return true;
      }else{
        this._router.navigate(["login"]);
        return false;
      }
  }
  sessionCheck(){
    return this._http.get<any>(`${baseUrl}/checksession`,{withCredentials:true})
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
