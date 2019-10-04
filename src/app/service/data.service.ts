import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
// import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private url: string,
    private http: HttpClient,
    // private _snackBar: MatSnackBar
  ) { 
    
  }

  getAll(){
    return this.http.get(this.url)
      .pipe(
        catchError(this.handleError)
      )
  }

  getOne(id){
    return this.http.get(this.url + '/' + id)
      .pipe(
        catchError(this.handleError)
      )
  }
  create(data){
    return this.http.post(this.url, data)
      .pipe(
        catchError(this.handleError)
      )
  }

  update(id, data){
    return this.http.put(this.url + '/' + id, data)
      .pipe(
        catchError(this.handleError)
      )
  }

  delete(id){
    return this.http.delete(this.url + '/' + id)
      .pipe(
        catchError(this.handleError)
      )
  }
  
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      // console.error('An error occurred:', error.error.message);
     
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
      
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
