import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  baseUrl = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode="
  constructor(
    private http: HttpClient,
    private datePipe: DatePipe
  ) {

  }

  getVaccineDetails(pincode, dt){
    return  this.http.get<any>(`${this.baseUrl}${pincode}&date=${dt}`)
  }


}
