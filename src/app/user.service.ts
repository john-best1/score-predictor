import { ActivatedRoute } from '@angular/router';
import { AppUser } from './models/app-user';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireObject} from 'angularfire2/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user$: Observable<firebase.User>
  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth, private route: ActivatedRoute) { 
    this.user$ = afAuth.authState;
  }

  save(user: firebase.User){
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    })
  }

  get(uid: string): AngularFireObject<AppUser>{
    return this.db.object('/users/' + uid);
  }
  loginWithGoogle(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }
  //loginWithFacebook(){
  //  let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
  //  localStorage.setItem('returnUrl', returnUrl);
  //  this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(res => console.log(res));
  //}
  logOut(){
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser>{
    return this.user$.pipe(
      switchMap(user => {
        if(user) return this.get(user.uid).valueChanges()
        return of(null);
      })
    )
  }
}
