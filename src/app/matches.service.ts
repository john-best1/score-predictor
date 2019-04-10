import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchesService {

  constructor(private http: HttpClient) { }

  get(teamCode: string): Observable<any>{
    const headers = new HttpHeaders().set('X-Auth-Token', '7830c352850f4acda78aa61d1666d45b');
    return this.http.get("http://api.football-data.org/v2/teams/" + teamCode + "/matches", {headers});      
  }
}
