import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FixturesService {

  // include a date in the get query like below if there are no fixtures that day
  date: string = "?dateFrom=2019-04-12&dateTo=2019-04-13"
  constructor(private http: HttpClient) { }


  get(){
    const headers = new HttpHeaders().set('X-Auth-Token', '7830c352850f4acda78aa61d1666d45b');
    return this.http.get("https://api.football-data.org/v2/matches" + this.date, {headers});
  }

  getFixture(fixtureId){
    const headers = new HttpHeaders().set('X-Auth-Token', '7830c352850f4acda78aa61d1666d45b');
    return this.http.get("https://api.football-data.org/v2/matches/" + fixtureId, {headers}); 
  }
}
