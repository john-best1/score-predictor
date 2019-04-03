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
  leagueCode: string = "PL";
  tableType: number = 0;
  leagueEntries: LeagueEntry[] = [];
  listData: MatTableDataSource<LeagueEntry>;
  displayedColumns: string[] = ['position', 'name', 'matchesPlayed', 'won', 'drawn', 'lost', 'goalsFor', 'goalsAgainst', 'goalDifference', 'points'];
  entry: LeagueEntry;
  leagues = [{id: 1, name: 'Premier League', code: 'PL'}, {id: 2, name: 'Ligue 1', code: 'FL1'},
            {id: 3, name: 'Championship', code: 'ELC'}, {id: 4, name: 'Brazillian Division One', code: 'BSA'},
            {id: 5, name: 'Bundesliga', code: 'BL1'},{id: 6, name: 'Italy Serie A', code: 'SA'},
            {id: 7, name: 'Eredivisie', code: 'DED'},{id: 8, name: 'Portuguese Primera Division', code: 'PPL'},
            {id: 9, name: 'Spain La Liga', code: 'PD'}];
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
