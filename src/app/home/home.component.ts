import { Fixture } from './../models/Fixture';
import { FixturesService } from './../fixtures.service';
import { Component } from '@angular/core';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  fixture: Fixture;
  fixtures: Fixture[] = [];
  fixtureLists = [[],[],[],[],[],[],[],[],[]];
  constructor(private fixturesService : FixturesService) { 
    this.getFixtures();
  }


  getFixtures(){
    return this.fixturesService.get()
    .subscribe(fixtures => {
      for(var i=0; i < fixtures["matches"].length; i++){
        this.fixture = new Fixture();
        this.fixture.id = fixtures["matches"][i]["id"];
        this.fixture.dateTime = fixtures["matches"][i]["utcDate"];
        this.fixture.homeTeamId = fixtures["matches"][i]["homeTeam"]["id"];
        this.fixture.homeTeamName = fixtures["matches"][i]["homeTeam"]["name"];
        this.fixture.awayTeamId = fixtures["matches"][i]["awayTeam"]["id"];
        this.fixture.awayTeamName = fixtures["matches"][i]["awayTeam"]["name"];
        this.fixture.leagueId = fixtures["matches"][i]["competition"]["id"];
        this.fixture.leagueName = fixtures["matches"][i]["competition"]["name"];   
        this.addToCorrectFixtureList();
      }}
      )
  }

  addToCorrectFixtureList(){
    switch(this.fixture.leagueId){
      //Brazillian Premier League
      case 2013:{
        this.fixtureLists[0].push(this.fixture);
        break;
      }
      //Eredivisie
      case 2003:{
        this.fixtureLists[1].push(this.fixture);
        break;
      }
      //Bundesliga
      case 2002:{
        this.fixtureLists[2].push(this.fixture);
        break;
      }
      //La Liga
      case 2014:{
        this.fixtureLists[3].push(this.fixture);
        break;
      }
      //Ligue 1
      case 2015:{
        this.fixtureLists[4].push(this.fixture);
        break;
      }
      //Championship
      case 2016:{
        this.fixtureLists[5].push(this.fixture);
        break;
      }
      //Liga NOS
      case 2017:{
        this.fixtureLists[6].push(this.fixture);
        break;
      }
      //Premier League
      case 2021:{
        this.fixtureLists[8].push(this.fixture);
        break;
      }
      default:{
        console.log("Invalid league Id")
        break;
      }
    }
  }

  buildFixtureString(team1, team2){
    return team1 + "   V   " + team2;
  }


}
