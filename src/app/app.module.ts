import { UserService } from './user.service';
import { MatchesService } from './matches.service';
import { FixturesService } from './fixtures.service';
import { LeaguesService } from './leagues.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { LeaguesComponent } from './leagues/leagues.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatProgressSpinnerModule, MatInputModule, MatExpansionModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import 'hammerjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PredictionComponent } from './prediction/prediction.component';
import {MatProgressBarModule} from '@angular/material';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { LoginComponent } from './login/login.component';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from './environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LeaguesComponent,
    PredictionComponent,
    LoadingSpinnerComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'prediction/:leagueId/:fixtureId/:homeTeamId/:awayTeamId', component: PredictionComponent },
      { path: 'leagues', component: LeaguesComponent },
      { path: 'login', component: LoginComponent }
    ]),
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatExpansionModule,
    MatProgressBarModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase, 'my-app-name'),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [
    LeaguesService,
    FixturesService,
    MatchesService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
