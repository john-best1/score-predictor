import { Fixture } from './../models/Fixture';
import { FixturesService } from './../fixtures.service';
import { Component } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  showSpinner: boolean = true;
  fixture: Fixture;
  fixtures: Fixture[] = [];
  dateString : string;
  fixtureListsEmpty: boolean = true;
  fixtureLists = [[],[],[],[],[],[],[],[],[],[]];
  todaysDate: Date = new Date();
  constructor(private fixturesService : FixturesService) { 
    this.getFixtures();
  }


  repopulateFixtures(event: MatDatepickerInputEvent<Date>){
    this.todaysDate = event.value;
    this.fixtureLists = [[],[],[],[],[],[],[],[],[],[]];
    this.fixtureListsEmpty = true;
    this.showSpinner = true;
    this.dateString = "&dateFrom=" + event.value.getFullYear() + "-" + ("0" + (event.value.getMonth() + 1)).slice(-2) + "-" + ("0" + (event.value.getDate())).slice(-2) + "&" + 
                      "dateTo=" + event.value.getFullYear() + "-" + ("0" + (event.value.getMonth() + 1)).slice(-2) + "-" + ("0" + (event.value.getDate())).slice(-2)
    this.getFixtures(this.dateString);                  
  }
  getFixtures(date: string = ''){

    return this.fixturesService.get(date)
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
      }
      for(var i = 0; i < this.fixtureLists.length; i++){
        if (this.fixtureLists[i].length > 0){
          this.fixtureListsEmpty = false;
        }
      }
      this.showSpinner = false;
    })
  }

  addToCorrectFixtureList(){
    switch(this.fixture.leagueId){
      //Premier League
      case 2021:{
        this.fixtureLists[0].push(this.fixture);
        break;
      }
      //Championship
      case 2016:{
        this.fixtureLists[1].push(this.fixture);
        break;
      }
      //La Liga
      case 2014:{
        this.fixtureLists[4].push(this.fixture);
        break;
      }
      //League 1
      case 2030:{
        this.fixtureLists[2].push(this.fixture);
        break;
      }
      //SPL
      case 2084:{
        this.fixtureLists[3].push(this.fixture);
        break;
      }
      //Serie A
      case 2019:{
        this.fixtureLists[5].push(this.fixture);
        break;
      }
      //Bundesliga
      case 2002:{
        this.fixtureLists[6].push(this.fixture);
        break;
      }
      //Ligue 1
      case 2015:{
        this.fixtureLists[7].push(this.fixture);
        break;
      }
      //Eredivisie
      case 2003:{
        this.fixtureLists[8].push(this.fixture);
        break;
      }
      //Liga NOS
      case 2017:{
        this.fixtureLists[9].push(this.fixture);
        break;
      }
      //Brazillian Premier League
      //case 2013:{
        //this.fixtureLists[8].push(this.fixture);
        //break;
      //}
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
