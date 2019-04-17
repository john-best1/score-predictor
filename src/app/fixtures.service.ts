import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FixturesService {

  // include a date in the get query like below if there are no fixtures that day
  //date: string = "&dateFrom=2019-04-12&dateTo=2019-04-15"
  //2008 australian
  //2019 serie a 2021 prem, 2016 champ, 2030 league 1, 2084 spl, 2014 la liga, 2002 bundes, 2019, serie a, 2015 ligue 1, 2003 eredivisie, 2017 liga nos
  competitions: string =  "?competitions=2021,2016,2030,2084,2014,2002,2019,2015,2003,2017"
  constructor(private http: HttpClient) { }


  get(date : string){
    const headers = new HttpHeaders().set('X-Auth-Token', '7830c352850f4acda78aa61d1666d45b');
    if (date){
      return this.http.get("https://api.football-data.org/v2/matches" + this.competitions + date, {headers});
    }else{
      return this.http.get("https://api.football-data.org/v2/matches" + this.competitions, {headers});
    } 
  }

  getFixture(fixtureId){
    const headers = new HttpHeaders().set('X-Auth-Token', '7830c352850f4acda78aa61d1666d45b');
    return this.http.get("https://api.football-data.org/v2/matches/" + fixtureId, {headers}); 
  }
}
