import { Injectable } from '@angular/core';
import {
    AngularFirestore,
    AngularFirestoreCollection
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { tantargy } from '../models/tantargy';

@Injectable({
    providedIn: 'root'
})
export class TableService {
    private readonly timetable?: AngularFirestoreCollection<tantargy>;
    private readonly timbetable_data?: Observable<any>;

    constructor(private readonly afs: AngularFirestore) {
        this.timetable = this.afs.collection('timetable');
        this.timbetable_data = this.afs.collection('timetable').valueChanges();
    }

    public listTimetable_data(): Observable<any> | undefined {
        return this.timbetable_data;
    }

    // return type: AngularFirestoreCollection<tantargy>
    public addTimetable(tantargy: tantargy) {
        return this.timetable?.doc(tantargy.id).set(tantargy);
    }

    // return type: AngularFirestoreCollection<tantargy>
    public deleteTimetable(tantargy: tantargy) {
        this.timetable?.doc(tantargy.id).delete();
    }

    public deleteAll(): void {
        this.afs
            .collection('timetable')
            .get()
            .toPromise()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    doc.ref.delete();
                });
            });
    }
}
