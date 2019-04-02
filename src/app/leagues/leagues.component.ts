import { LeagueEntry } from './../models/LeagueEntry';
import { LeaguesService } from './../leagues.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.css']
})
export class LeaguesComponent {

  league: Observable<any>;
  leagueEntries: LeagueEntry[] = [];
  listData: MatTableDataSource<LeagueEntry>;
  displayedColumns: string[] = ['position', 'name', 'matches', 'won', 'drawn', 'lost', 'gf', 'ga', 'gd', 'points'];
  entry: LeagueEntry;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private leagueService: LeaguesService) { 

    this.league = leagueService.get();
    this.league.subscribe(res => {
      for(var i=0; i < res["standings"][0]["table"].length; i++){
        this.entry = new LeagueEntry();
        this.entry.position = res["standings"][0]["table"][i]["position"];
        this.entry.name = res["standings"][0]["table"][i]["team"]["name"];
        this.entry.matchesPlayed = res["standings"][0]["table"][i]["playedGames"];
        this.entry.won = res["standings"][0]["table"][i]["won"];
        this.entry.drawn = res["standings"][0]["table"][i]["draw"];
        this.entry.lost = res["standings"][0]["table"][i]["lost"];
        this.entry.goalsFor = res["standings"][0]["table"][i]["goalsFor"];
        this.entry.goalsAgainst = res["standings"][0]["table"][i]["goalsAgainst"];
        this.entry.goalDifference = res["standings"][0]["table"][i]["goalDifference"];
        this.entry.points = res["standings"][0]["table"][i]["points"];     
        this.leagueEntries.push(this.entry);
        this.initializeTable(this.leagueEntries);
      }
    })

    
  }

  private initializeTable(entries: LeagueEntry[]){
    this.listData = new MatTableDataSource(entries);
    this.listData.sort = this.sort;
  }


}
