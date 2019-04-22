import { MatchResult } from './../models/MatchResult';
import { LastSixResults } from './../models/LastSixResults';
import { SeasonStats } from './../models/SeasonStats';
import { LeaguesService } from './../leagues.service';
import { FixturesService } from './../fixtures.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FixtureForPrediction } from '../models/FixtureForPrediction';
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
  homeResults$;
  homeResults: LastSixResults;
  homeSixGameCount = 6;
  awaySixGameCount = 6;
  awayResults$;
  awayResults;
  resultToAdd : MatchResult;
  resultPrediction: number = 0;
  predictedHomeGoalsWhole: number;
  predictedAwayGoalsWhole: number;
  country: string;

  constructor(  private route: ActivatedRoute, private router: Router, private fixturesService: FixturesService, private leagueService: LeaguesService,
    private matchesService: MatchesService) { 
      this.country = this.route.snapshot.paramMap.get('country');
      this.fixture$ = this.fixturesService.getFixture(this.route.snapshot.paramMap.get('fixtureId'));
      this.populateFixture();
      this.league$ = this.leagueService.get(+this.route.snapshot.paramMap.get('leagueId'));
      this.populateStatSheets();
      this.homeResults$ = this.matchesService.get(this.route.snapshot.paramMap.get('homeTeamId'));
      this.populateHomeResults();
      this.awayResults$ = this.matchesService.get(this.route.snapshot.paramMap.get('awayTeamId'));
      this.populateAwayResults();
  }

  populateHomeResults(){
    return this.homeResults$.subscribe(res => {
      this.homeResults = new LastSixResults();   
      this.homeResults.teamId = this.route.snapshot.paramMap.get('homeTeamId')
      this.homeResults.matches = [];
      for(var i = (+res["matches"].length)-1; i != ((+res["matches"].length)-1) - this.homeSixGameCount; i--){
        if (res["matches"][i]["competition"]["id"] == this.route.snapshot.paramMap.get('leagueId')){    
          this.resultToAdd = new MatchResult();
          this.resultToAdd.homeTeamId = res["matches"][i]["homeTeam"]["id"];       
          this.resultToAdd.awayTeamId = res["matches"][i]["awayTeam"]["id"];
          this.resultToAdd.homeTeamScore = res["matches"][i]["score"]["fullTime"]["homeTeam"];
          this.resultToAdd.awayTeamScore = res["matches"][i]["score"]["fullTime"]["awayTeam"];
          this.resultToAdd.winner = res["matches"][i]["score"]["winner"];
          this.homeResults.matches.push(this.resultToAdd);
        }
        else{
          this.homeSixGameCount ++;
        }
      }
      for (var i = 0; i < 6; i++){
        if (this.homeResults.matches[i].homeTeamId == this.homeResults.teamId){         
          this.homeResults.totalScored = this.homeResults.totalScored + this.homeResults.matches[i].homeTeamScore; 
          this.homeResults.totalConceded = this.homeResults.totalConceded + this.homeResults.matches[i].awayTeamScore; 
          if (this.homeResults.matches[i].homeTeamScore > this.homeResults.matches[i].awayTeamScore){
            this.homeResults.totalHomeWins ++;
            this.homeResults.totalPoints = this.homeResults.totalPoints + 3;
          }
          else if (this.homeResults.matches[i].homeTeamScore == this.homeResults.matches[i].awayTeamScore){
            this.homeResults.totalHomeDraws ++;
            this.homeResults.totalPoints ++;
          }
        }
        else{
          this.homeResults.totalScored = this.homeResults.totalScored + this.homeResults.matches[i].awayTeamScore; 
          this.homeResults.totalConceded = this.homeResults.totalConceded + this.homeResults.matches[i].homeTeamScore; 
          if (this.homeResults.matches[i].awayTeamScore > this.homeResults.matches[i].homeTeamScore){
            this.homeResults.totalAwayWins ++;
            this.homeResults.totalPoints = this.homeResults.totalPoints + 4.5;
          }
          else if (this.homeResults.matches[i].homeTeamScore == this.homeResults.matches[i].awayTeamScore){
            this.homeResults.totalAwayDraws ++;
            this.homeResults.totalPoints = this.homeResults.totalPoints + 1.5;
          }
        }
      }
    }
    )
  }

  populateAwayResults(){
    return this.awayResults$.subscribe(res => {
      this.awayResults = new LastSixResults();   
      this.awayResults.teamId = this.route.snapshot.paramMap.get('awayTeamId')
      this.awayResults.matches = [];
      for(var i = (+res["matches"].length)-1; i != ((+res["matches"].length)-1) - this.awaySixGameCount; i--){
        if (res["matches"][i]["competition"]["id"] == this.route.snapshot.paramMap.get('leagueId')){   
          this.resultToAdd = new MatchResult();
          this.resultToAdd.homeTeamId = res["matches"][i]["homeTeam"]["id"];       
          this.resultToAdd.awayTeamId = res["matches"][i]["awayTeam"]["id"];
          this.resultToAdd.homeTeamScore = res["matches"][i]["score"]["fullTime"]["homeTeam"];
          this.resultToAdd.awayTeamScore = res["matches"][i]["score"]["fullTime"]["awayTeam"];
          this.resultToAdd.winner = res["matches"][i]["score"]["winner"];
          this.awayResults.matches.push(this.resultToAdd);
        }
        else{
          this.awaySixGameCount ++;
        }
      }
      for (var i = 0; i < 6; i++){
        if (this.awayResults.matches[i].homeTeamId == this.awayResults.teamId){         
          this.awayResults.totalScored = this.awayResults.totalScored + this.awayResults.matches[i].homeTeamScore; 
          this.awayResults.totalConceded = this.awayResults.totalConceded + this.awayResults.matches[i].awayTeamScore; 
          if (this.awayResults.matches[i].homeTeamScore > this.awayResults.matches[i].awayTeamScore){
            this.awayResults.totalHomeWins ++;
            this.awayResults.totalPoints = this.awayResults.totalPoints + 3;
          }
          else if (this.awayResults.matches[i].homeTeamScore == this.awayResults.matches[i].awayTeamScore){
            this.awayResults.totalHomeDraws ++;
            this.awayResults.totalPoints ++;
          }
        }
        else{
          this.awayResults.totalScored = this.awayResults.totalScored + this.awayResults.matches[i].awayTeamScore; 
          this.awayResults.totalConceded = this.awayResults.totalConceded + this.awayResults.matches[i].homeTeamScore; 
          if (this.awayResults.matches[i].awayTeamScore > this.awayResults.matches[i].homeTeamScore){
            this.awayResults.totalAwayWins ++;
            this.awayResults.totalPoints = this.awayResults.totalPoints + 4.5;
          }
          else if (this.awayResults.matches[i].homeTeamScore == this.awayResults.matches[i].awayTeamScore){
            this.awayResults.totalAwayDraws ++;
            this.awayResults.totalPoints = this.awayResults.totalPoints + 1.5;
          }
        }
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
          this.homeStats.leaguePos = i + 1;
        }
        else if (res["standings"]["0"]["table"][i]["team"]["id"] == this.route.snapshot.paramMap.get('awayTeamId')){
          this.awayStats.matchesPlayed = res["standings"]["0"]["table"][i]["playedGames"];
          this.awayStats.drawn = res["standings"]["0"]["table"][i]["draw"];
          this.awayStats.won = res["standings"]["0"]["table"][i]["won"];
          this.awayStats.lost = res["standings"]["0"]["table"][i]["lost"];
          this.awayStats.scored = res["standings"]["0"]["table"][i]["goalsFor"];
          this.awayStats.conceded = res["standings"]["0"]["table"][i]["goalsAgainst"];
          this.awayStats.leaguePos = i + 1;
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

  wdl(total, won, drawn, lost){
     return (won / total * 100).toPrecision(2) + "/" + (drawn / total * 100).toPrecision(2) + "/" + (lost / total * 100).toPrecision(2);
  }

  goalsPerGame(scored, total){
    return (scored/total).toPrecision(2);
  }

  predictedResult(homeTeam : string, awayTeam: string, homePoints : number, awayPoints : number){
    if (homePoints - awayPoints > -0.5){     
      this.resultPrediction = 1;
      if (homePoints - awayPoints > 5.5){
        return homeTeam + " Win - STRONG";
      }
      else{
        return homeTeam + " Win" 
      }
    }
    else if (awayPoints - homePoints > 6.5){
        this.resultPrediction = 2;
      if(awayPoints - homePoints > 12.5){
        return awayTeam + " Win - STRONG";
      }
      else{
        return awayTeam + " Win" 
      }
    }
    else{
      this.resultPrediction = 3;
      return "Draw"
    }
}

  predictedScore(){
    this.predictedHomeGoalsWhole = Math.round(this.homeResults.totalScored / 6); 
    this.predictedAwayGoalsWhole = Math.round(this.awayResults.totalScored / 6); 

    if (this.resultPrediction == 1 && this.predictedHomeGoalsWhole <= this.predictedAwayGoalsWhole){
        if(this.predictedAwayGoalsWhole > (this.homeResults.totalConceded / 6)){
          this.predictedAwayGoalsWhole = this.predictedHomeGoalsWhole - 1;
        }
        else {
          this.predictedHomeGoalsWhole = this.predictedAwayGoalsWhole + 1;
        }
      }
    else if(this.resultPrediction == 2 && this.predictedAwayGoalsWhole <= this.predictedHomeGoalsWhole){
      if (this.predictedHomeGoalsWhole > (this.awayResults.totalConceded / 6)){
        this.predictedHomeGoalsWhole = this.predictedAwayGoalsWhole - 1;
      }
      else{
        this.predictedAwayGoalsWhole = this.predictedHomeGoalsWhole + 1;
      }
    }
    else if(this.resultPrediction == 3 && this.predictedHomeGoalsWhole != this.predictedAwayGoalsWhole){
      this.predictedAwayGoalsWhole = this.predictedHomeGoalsWhole
    }
    
    return this.predictedHomeGoalsWhole + " - " + this.predictedAwayGoalsWhole;
  }
}
