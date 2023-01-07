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
export class GenerateTableService {
    private readonly timetable?: AngularFirestoreCollection<tantargy>;
    private readonly timbetable_data?: Observable<any>;

    constructor(private readonly afs: AngularFirestore) {
        this.timetable = this.afs.collection('general_table');
        this.timbetable_data = this.afs
            .collection('general_table')
            .valueChanges();
    }

    public listGenerateTable(): Observable<any> | undefined {
        return this.timbetable_data;
    }

    // return type: AngularFirestoreCollection<tantargy>
    public addGeneralTable(tantargy: tantargy) {
        return this.timetable?.doc(tantargy.id).set(tantargy);
    }

    public removeGeneralTable(): void {
        this.afs
            .collection('general_table')
            .get()
            .toPromise()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    doc.ref.delete();
                });
            });
    }
}
