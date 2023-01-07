import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { user } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    private readonly users?: Observable<any[]>;
    private readonly maps?: Observable<any[]>;

    constructor(private readonly afs: AngularFirestore) {
        this.users = this.afs.collection('Users').valueChanges();
        this.maps = this.afs.collection('user-table').valueChanges();
    }

    // return type
    public addMap(user: string, map: object) {
        return this.afs
            .collection<any>('user-table')
            .doc(user)
            .set(Object.assign({}, map));
    }

    public listMaps(): Observable<any[]> | undefined {
        return this.maps;
    }

    // return type
    public create(user: user) {
        return this.afs.collection<user>('Users').doc(user.id).set(user);
    }

    public listUsers(): Observable<any[]> | undefined {
        return this.users;
    }

    public deleteMap(): void {
        this.afs
            .collection('user-table')
            .get()
            .toPromise()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    doc.ref.delete();
                });
            });
    }
}
