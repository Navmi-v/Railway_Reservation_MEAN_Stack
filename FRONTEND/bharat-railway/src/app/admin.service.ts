import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { map, catchError } from 'rxjs/operators';
// import { from } from 'rxjs';

import {Admin} from './admin.model';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  selectedAdmin: Admin = new Admin;
  admins: Admin[];

  private baseURL="http://localhost:4000/api/trains";

  private putURL="http://localhost:4000/api/trains";
  private deleteURL='http://localhost:4000/api/trains';



  constructor(private http:HttpClient) { }

  postAdmin(ad: Admin){
    return this.http.post<any>(this.baseURL,ad);
  }



  getAdminList(){
    return this.http.get<any>("http://localhost:4000/api/trains/all");
  }

  putAdmin(ad:Admin){
    return this.http.put<any>(this.putURL+`/${ad.trainNum}`,ad);
  }

  deleteAdmin(trainNum:any){
    return this.http.delete<any>(this.deleteURL+`/${trainNum}`)
  }

}
