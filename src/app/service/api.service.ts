import { Climate } from './../model/climate';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Weather } from '../model/weather';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://api.openweathermap.org/data/2.5/weather';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getWeatherByCityName(nome: string): Observable<any> {
    const url = `${apiUrl}?q=${nome},pt_br&appid=${'67f17ad6caf9a3df4c9fc856cdc9270f'}`;
    return this.http.get<any>(url).pipe(
      tap(_ => console.log(`read weather city name=${name}`)),
      catchError(this.handleError<any>(`getWeatherByCityName name=${name}`))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }
}
