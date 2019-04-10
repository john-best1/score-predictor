import { LastSixResults } from './../models/LastSixResults';
import { SeasonStats } from './../models/SeasonStats';
import { LeaguesService } from './../leagues.service';
import { FixturesService } from './../fixtures.service';
import { Fixture } from './../models/Fixture';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FixtureForPrediction } from '../models/FixtureForPrediction';
import { Observable } from 'rxjs';
import { Stats } from 'fs';
import { MatChipsDefaultOptions } from '@angular/material';
import { filterQueryId } from '@angular/core/src/view/util';
import { MatchesService } from '../matches.service';

@Component({
  selector: 'prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.css']
})
export class PredictionComponent{

  fixture$;
  league$;
  homeStats: SeasonStats;
  awayStats: SeasonStats;
  fixture: FixtureForPrediction;
  currentMatchday: number;
  homeResults$
  homeResults: LastSixResults;
  HomeSixGameCount = 6;
  AwaySixGameCount = 6;
  awayResults$;
  awayResults;

  constructor(  private route: ActivatedRoute, private router: Router, private fixturesService: FixturesService, private leagueService: LeaguesService,
    private matchesService: MatchesService) { 
      this.fixture$ = this.fixturesService.getFixture(this.route.snapshot.paramMap.get('fixtureId'));
      this.populateFixture();
      this.league$ = this.leagueService.get(this.route.snapshot.paramMap.get('leagueId'));
      this.populateStatSheets();
      this.homeResults$ = this.matchesService.get(this.route.snapshot.paramMap.get('homeTeamId'));
      this.populateHomeResults();
      this.awayResults$ = this.matchesService.get(this.route.snapshot.paramMap.get('awayTeamId'));
  }

  populateHomeResults(){
    return this.homeResults$.subscribe(res => {
      console.log("WOOHOO 1")
      for(var i = this.currentMatchday -1; i != (this.currentMatchday-1) - this.HomeSixGameCount; i--){
        console.log("WOOHOO");
      }
    })
  }
  populateFixture(){
    return this.fixture$.subscribe(res => {
      this.fixture = new FixtureForPrediction();
      this.fixture.homeTeamId = res["match"]["homeTeam"]["id"];
      this.fixture.homeTeamName = res["match"]["homeTeam"]["name"];
      this.fixture.awayTeamId = res["match"]["awayTeam"]["id"];
      this.fixture.awayTeamName = res["match"]["awayTeam"]["name"];
      this.fixture.dateTime = res["match"]["utcDate"];
      this.fixture.id = res["match"]["id"];
      this.fixture.leagueId = res["match"]["competition"]["id"];
      this.fixture.leagueName = res["match"]["competition"]["name"];
      this.fixture.venue = res["match"]["venue"];
      this.currentMatchday = res["match"]["matchday"];
      console.log(res);
    })
  }

  populateStatSheets(){
    return this.league$.subscribe(res =>{
      this.homeStats = new SeasonStats();
      this.awayStats = new SeasonStats();
      for (var i = 0; i < res["standings"]["0"]["table"].length; i++){
        if (res["standings"]["0"]["table"][i]["team"]["id"] == this.route.snapshot.paramMap.get('homeTeamId')){
          this.homeStats.matchesPlayed = res["standings"]["0"]["table"][i]["playedGames"];
          this.homeStats.drawn = res["standings"]["0"]["table"][i]["draw"];
          this.homeStats.won = res["standings"]["0"]["table"][i]["won"];
          this.homeStats.lost = res["standings"]["0"]["table"][i]["lost"];
          this.homeStats.scored = res["standings"]["0"]["table"][i]["goalsFor"];
          this.homeStats.conceded = res["standings"]["0"]["table"][i]["goalsAgainst"];
        }
        else if (res["standings"]["0"]["table"][i]["team"]["id"] == this.route.snapshot.paramMap.get('awayTeamId')){
          this.awayStats.matchesPlayed = res["standings"]["0"]["table"][i]["playedGames"];
          this.awayStats.drawn = res["standings"]["0"]["table"][i]["draw"];
          this.awayStats.won = res["standings"]["0"]["table"][i]["won"];
          this.awayStats.lost = res["standings"]["0"]["table"][i]["lost"];
          this.awayStats.scored = res["standings"]["0"]["table"][i]["goalsFor"];
          this.awayStats.conceded = res["standings"]["0"]["table"][i]["goalsAgainst"];
        }     
      }                   
      for(var i = 0; i < res["standings"]["1"]["table"].length; i++){
        if (res["standings"]["1"]["table"][i]["team"]["id"] == this.route.snapshot.paramMap.get('homeTeamId')){
          this.homeStats.homeOrAwayPlayed = res["standings"]["0"]["table"][i]["playedGames"];
          this.homeStats.homeOrAwayDrawn = res["standings"]["0"]["table"][i]["draw"];
          this.homeStats.homeOrAwayWon = res["standings"]["0"]["table"][i]["won"];
          this.homeStats.homeOrAwayLost = res["standings"]["0"]["table"][i]["lost"];
          this.homeStats.homeOrAwayScored = res["standings"]["0"]["table"][i]["goalsFor"];
          this.homeStats.homeOrAwayConceded = res["standings"]["0"]["table"][i]["goalsAgainst"];
        }
      }
      for(var i = 0; i < res["standings"]["2"]["table"].length; i++){
        if (res["standings"]["2"]["table"][i]["team"]["id"] == this.route.snapshot.paramMap.get('awayTeamId')){
          this.awayStats.homeOrAwayPlayed = res["standings"]["2"]["table"][i]["playedGames"];
          this.awayStats.homeOrAwayDrawn = res["standings"]["2"]["table"][i]["draw"];
          this.awayStats.homeOrAwayWon = res["standings"]["2"]["table"][i]["won"];
          this.awayStats.homeOrAwayLost = res["standings"]["2"]["table"][i]["lost"];
          this.awayStats.homeOrAwayScored = res["standings"]["2"]["table"][i]["goalsFor"];
          this.awayStats.homeOrAwayConceded = res["standings"]["2"]["table"][i]["goalsAgainst"];
        }
      }
    }
    )  
  }

}
