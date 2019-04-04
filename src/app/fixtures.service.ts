import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FixturesService {

  constructor(private http: HttpClient) { }

  get(){
    const headers = new HttpHeaders().set('X-Auth-Token', '7830c352850f4acda78aa61d1666d45b');
    return this.http.get("https://api.football-data.org/v2/matches?competitions=2013,2003", {headers});
  }
}
