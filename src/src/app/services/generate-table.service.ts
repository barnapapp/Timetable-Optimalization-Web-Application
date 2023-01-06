import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { tantargy } from '../models/tantargy';

@Injectable({
  providedIn: 'root'
})
export class GenerateTableService {

  
  timetable?: AngularFirestoreCollection<tantargy>;
  timbetable_data?: Observable<any>;

  constructor(private afs: AngularFirestore) {
    this.timetable = this.afs.collection('general_table');
    this.timbetable_data = this.afs.collection('general_table').valueChanges();
   }


   listGenerateTable() {
    return this.timbetable_data;
   }


   addGeneralTable(tantargy: tantargy) {
    return this.timetable?.doc(tantargy.id).set(tantargy);
   }

   removeGeneralTable() {
    this.afs.collection('general_table').get().toPromise().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete();
      })
    })
   }

}
