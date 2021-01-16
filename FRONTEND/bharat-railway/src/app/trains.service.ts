import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Train } from './trains';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainsService {

  private _url = "http://localhost:4000/api/trains";

  train: Train[] = [];

  constructor(private http: HttpClient) { }


  searchTrain(source: String, destination: String):
    Observable<any> {
    return this.http.get<any>("http://localhost:4000/api/trains/" + source + '/' + destination)

  }

  // getTrains() {
  //   return this.http.get<any>(this._url)
  // }

}
