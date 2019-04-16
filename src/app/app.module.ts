import { MatchesService } from './matches.service';
import { FixturesService } from './fixtures.service';
import { LeaguesService } from './leagues.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { LeaguesComponent } from './leagues/leagues.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatProgressSpinnerModule, MatInputModule, MatExpansionModule } from '@angular/material';
import 'hammerjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PredictionComponent } from './prediction/prediction.component';
import {MatProgressBarModule} from '@angular/material';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LeaguesComponent,
    PredictionComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'prediction/:leagueId/:fixtureId/:homeTeamId/:awayTeamId', component: PredictionComponent },
      { path: 'leagues', component: LeaguesComponent }
    ]),
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatExpansionModule,
    MatProgressBarModule,
    BrowserAnimationsModule
  ],
  providers: [
    LeaguesService,
    FixturesService,
    MatchesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
