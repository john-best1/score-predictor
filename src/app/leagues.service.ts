
import { Injectable } from '@angular/core';
import {  HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaguesService {

  league: Promise<Observable<any>>;
  constructor(private http: HttpClient) { }

  get(): Observable<any>{
    const headers = new HttpHeaders().set('X-Auth-Token', '7830c352850f4acda78aa61d1666d45b');
    return this.http.get("https://api.football-data.org/v2/competitions/PL/standings", {headers});
      
  }
}
