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
  fixtureLists = [[],[]];
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
        //this.initializeTable(this.leagueEntries);
      }}
      )
  }

  addToCorrectFixtureList(){
    switch(this.fixture.leagueId){
      case 2013:{
        this.fixtureLists[0].push(this.fixture);
        break;
      }
      case 2003:{
        this.fixtureLists[1].push(this.fixture);
        break;
      }
      default:{
        console.log("Invalid league Id")
        break;
      }
    }
  }



}
