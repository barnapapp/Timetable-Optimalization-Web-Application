import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user_uid?: string;
  loggedIn: boolean = false;
  constructor(private auth: AngularFireAuth) { }

  login(email: string, password: string) {
    this.loggedIn = true;
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signUp(email: string, password: string) {
    this.loggedIn = true;
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  admin_chekker() {
    this.loggedIn = true;
    this.auth.onAuthStateChanged((user: any) => {
      if(user) {
        this.user_uid = user.uid;
      }
    })
    return this.user_uid;
  }

  isAuthenticated() {
    return this.loggedIn;
  }

}
