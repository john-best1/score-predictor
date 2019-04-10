import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FixturesService {

  availableLeagueCodes: string = "2002,2003,2013,2014,2015,2016,2017,2019,2021"
  constructor(private http: HttpClient) { }

  get(){
    const headers = new HttpHeaders().set('X-Auth-Token', '7830c352850f4acda78aa61d1666d45b');
    return this.http.get("https://api.football-data.org/v2/matches?competitions=" + this.availableLeagueCodes, {headers});
  }

  getFixture(fixtureId){
    const headers = new HttpHeaders().set('X-Auth-Token', '7830c352850f4acda78aa61d1666d45b');
    return this.http.get("https://api.football-data.org/v2/matches/" + fixtureId, {headers}); 
  }
}
