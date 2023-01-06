import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { user } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users?: Observable<any[]>;
  maps?: Observable<any[]>;

  constructor(private afs: AngularFirestore) { 
    this.users = this.afs.collection('Users').valueChanges();
    this.maps = this.afs.collection('user-table').valueChanges();
  }

  addMap(user: string, map: object) {
    return this.afs.collection<any>("user-table").doc(user).set(Object.assign({},map));
  }

  listMaps() {
    return this.maps;
  }

  create(user: user) {
    return this.afs.collection<user>("Users").doc(user.id).set(user);
  }

  listUsers() {
    return this.users;
  }

  deleteMap() {
    this.afs.collection('user-table').get().toPromise().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete();
      })
    })
  }

}
