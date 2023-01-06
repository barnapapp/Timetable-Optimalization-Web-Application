import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { tantargy } from '../models/tantargy';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  timetable?: AngularFirestoreCollection<tantargy>;
  timbetable_data?: Observable<any>;


  constructor(private afs: AngularFirestore) { 
    this.timetable = this.afs.collection('timetable');
    this.timbetable_data = this.afs.collection('timetable').valueChanges();
  }

  listTimetable_data() {
    return this.timbetable_data;
  }

  addTimetable(tantargy: tantargy) {
    return this.timetable?.doc(tantargy.id).set(tantargy);
  }

  deleteTimetable(tantargy: tantargy) {
      this.timetable?.doc(tantargy.id).delete();
  }

  deleteAll() {
    this.afs.collection('timetable').get().toPromise().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete();
      })
    })
  }

}

