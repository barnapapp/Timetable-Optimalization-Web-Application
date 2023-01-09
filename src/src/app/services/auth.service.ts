import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private user_uid?: string;
    private loggedIn = false;
    constructor(private readonly auth: AngularFireAuth) {}

    public login(
        email: string,
        password: string
    ): Promise<firebase.auth.UserCredential> {
        this.loggedIn = true;
        return this.auth.signInWithEmailAndPassword(email, password);
    }
    public signUp(
        email: string,
        password: string
    ): Promise<firebase.auth.UserCredential> {
        this.loggedIn = true;
        return this.auth.createUserWithEmailAndPassword(email, password);
    }

    public admin_chekker(): string | undefined {
        this.loggedIn = true;
        this.auth.onAuthStateChanged((user: any) => {
            if (user) {
                this.user_uid = user.uid;
            }
        });
        return this.user_uid;
    }

    public isAuthenticated(): boolean {
        return this.loggedIn;
    }
}
