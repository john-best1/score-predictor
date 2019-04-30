import { LeagueEntry } from './../models/LeagueEntry';
import { LeaguesService } from './../leagues.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatSort } from '@angular/material';
import { stringify } from '@angular/core/src/util';

@Component({
  selector: 'leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.css']
})
export class LeaguesComponent {

  league: Observable<any>;
  leagueCode: number = 2021;
  tableType: number = 0;
  leagueEntries: LeagueEntry[] = [];
  listData: MatTableDataSource<LeagueEntry>;
  displayedColumns: string[] = ['position', 'name', 'matchesPlayed', 'won', 'drawn', 'lost', 'goalsFor', 'goalsAgainst', 'goalDifference', 'points'];
  entry: LeagueEntry;
  //2021 prem, 2016 champ, 2030 league 1, 2084 spl, 2014 la liga, 2002 bundes, 2019 serie a, 2015 ligue 1, 2003 eredivisie, 2017 liga nos
  leagues = [{id: 1, name: 'England Premier League', code: 2021}, {id: 2, name: 'England Championship', code: 2016}, 
            {id: 3, name: 'England League 1', code: 2030},{id: 4, name: 'Scotland Premier League', code: 2084},
            {id: 5, name: 'Spain La Liga', code: 2014},{id: 6, name: 'Germany Bundesliga', code: 2002},
            {id: 7, name: 'Italy Serie A', code: 2019},{id: 8, name: 'France Ligue 1', code: 2015}, 
            {id: 9, name: 'Holland Eredivisie', code: 2003},{id: 10, name: 'Portugal Primera Division', code: 2017}];
  formTypes = [{id: 0, name: 'Total'},{id: 1, name: 'Home'},{id: 2, name: 'Away'}];

  @ViewChild(MatSort) sort: MatSort;

  constructor(private leagueService: LeaguesService) { 
      this.getTable()
    }


    getTable(){
      this.league = this.leagueService.get(this.leagueCode);
      this.populateLeagueEntries(this.tableType);
    }

    populateLeagueEntries(type: number){
      this.league.subscribe(res => {
        console.log("League Data")
        console.log(res)
        for(var i=0; i < res["standings"][type]["table"].length; i++){
          this.entry = new LeagueEntry();
          this.entry.position = res["standings"][type]["table"][i]["position"];
          this.entry.name = res["standings"][type]["table"][i]["team"]["name"];
          this.entry.matchesPlayed = res["standings"][type]["table"][i]["playedGames"];
          this.entry.won = res["standings"][type]["table"][i]["won"];
          this.entry.drawn = res["standings"][type]["table"][i]["draw"];
          this.entry.lost = res["standings"][type]["table"][i]["lost"];
          this.entry.goalsFor = res["standings"][type]["table"][i]["goalsFor"];
          this.entry.goalsAgainst = res["standings"][type]["table"][i]["goalsAgainst"];
          this.entry.goalDifference = res["standings"][type]["table"][i]["goalDifference"];
          this.entry.points = res["standings"][type]["table"][i]["points"];     
          this.leagueEntries.push(this.entry);
          this.initializeTable(this.leagueEntries);
        }})
    }

    onChangeLeague(leagueId){
    this.leagueCode = this.leagues.filter(l => l.id == leagueId)[0].code;
    this.leagueEntries = [];
    this.getTable();
  }

  onChangeForm(formTypeId){
    this.tableType = this.formTypes.filter(f => f.id == formTypeId)[0].id;
    this.leagueEntries = [];
    this.populateLeagueEntries(this.tableType);
  }

  private initializeTable(entries: LeagueEntry[]){
    this.listData = new MatTableDataSource(entries);
    this.listData.sort = this.sort;
  }


}
