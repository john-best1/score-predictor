import { AppUser } from './../models/app-user';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{

  user$:  Observable<firebase.User>;
  appUser: AppUser;
  constructor(private afAuth: AngularFireAuth) { 
    this.user$ = afAuth.authState;
  }

  logOut(){
    this.afAuth.auth.signOut();
  }
}
