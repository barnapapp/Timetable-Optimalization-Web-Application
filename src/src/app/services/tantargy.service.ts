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
export class TantargyService {
    private readonly tantargyCollection?: AngularFirestoreCollection<tantargy>;
    private readonly tantargyak?: Observable<any>;

    constructor(private readonly afs: AngularFirestore) {
        this.tantargyCollection = this.afs.collection('targy');
        this.tantargyak = this.afs.collection('targy').valueChanges();
    }

    public listSubjects(): Observable<any> | undefined {
        return this.tantargyak;
    }

    public addSubject(tantargy: tantargy): Promise<void> | undefined {
        tantargy.id = this.afs.createId();
        tantargy.goodness_index = +this.index_of_goodness(tantargy).toFixed(3);
        return this.tantargyCollection?.doc(tantargy.id).set(tantargy);
    }

    public deleteSubject(tantargy: tantargy): void {
        this.tantargyCollection?.doc(tantargy.id).delete();
    }

    public updateSubject(tantargy: tantargy): Promise<void> | undefined {
        return this.tantargyCollection?.doc(tantargy.id).set(tantargy);
    }

    private index_of_goodness(tantargy: tantargy): number {
        let multiplier_nehezseg = 0;
        let result = 0;
        let multiplier_hasznossag = 0;

        switch (true) {
            case tantargy.kredit === 0:
                multiplier_nehezseg = 0.4;
                multiplier_hasznossag = 1.2;
                break;
            case tantargy.kredit > 0 && tantargy.kredit < 5:
                multiplier_nehezseg = 0.6;
                multiplier_hasznossag = 1.4;
                break;
            case tantargy.kredit >= 5:
                multiplier_nehezseg = 0.8;
                multiplier_hasznossag = 1.6;
                break;
        }
        result =
            tantargy.hasznossag * multiplier_hasznossag -
            tantargy.nehezseg * multiplier_nehezseg;

        if (result < 1) {
            result = 0;
        } else if (result > 5) {
            result = 5;
        }
        return result;
    }
}
