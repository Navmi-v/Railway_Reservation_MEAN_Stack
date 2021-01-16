import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tickets } from './tickets'

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private _ticketUrl = "http://localhost:8000/booking"
  constructor(private _http: HttpClient) { }

  postTicket(ticket): Observable<any> {
    return this._http.post<any>("http://localhost:8000/booking", ticket)
  }

  deleteTicket(pnr) {
    return this._http.delete("http://localhost:8000/booking/" + pnr)
  }

  getTick(pnr){
    return this._http.get<any>("http://localhost:8000/booking/"+pnr)
  }


}
