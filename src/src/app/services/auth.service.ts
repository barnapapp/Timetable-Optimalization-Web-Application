import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private user_uid?: string;
    private loggedIn = false;
    constructor(private readonly auth: AngularFireAuth) {}

    // return type: Promise<firebase.auth.UserCredential>
    public login(email: string, password: string) {
        this.loggedIn = true;
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    // return type: Promise<firebase.auth.UserCredential>
    public signUp(email: string, password: string) {
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
