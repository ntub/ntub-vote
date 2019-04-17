import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  provider = new auth.GoogleAuthProvider();

  constructor(public afAuth: AngularFireAuth) {
    this.provider.addScope('email');
    this.provider.addScope('profile');
  }

  login() {
    this.afAuth.auth.signInWithPopup(this.provider);
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
