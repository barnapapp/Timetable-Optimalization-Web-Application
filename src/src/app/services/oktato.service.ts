import { Injectable } from '@angular/core';
import {
    AngularFirestore,
    AngularFirestoreCollection
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { oktato } from '../models/oktato';

@Injectable({
    providedIn: 'root'
})
export class OktatoService {
    private readonly oktatoCollection?: AngularFirestoreCollection<oktato>;
    private readonly oktatok?: Observable<any>;

    constructor(private readonly afs: AngularFirestore) {
        this.oktatoCollection = this.afs.collection('oktato');
        this.oktatok = this.afs.collection('oktato').valueChanges();
    }

    // return type: AngularFirestoreCollection<oktato>
    public addTrainer(oktato: oktato) {
        oktato.id = this.afs.createId();
        oktato.goodness_index = +this.index_of_goodness(oktato).toFixed(3);
        return this.oktatoCollection?.doc(oktato.id).set(oktato);
    }

    public listTrainer(): Observable<any> | undefined {
        return this.oktatok;
    }

    // return type: AngularFirestoreCollection<oktato>
    public deleteTrainer(oktato: oktato) {
        this.oktatoCollection?.doc(oktato.id).delete();
    }

    // return type: AngularFirestoreCollection<oktato>
    public updateTrainer(oktato: oktato) {
        return this.oktatoCollection?.doc(oktato.id).set(oktato);
    }

    private index_of_goodness(oktato: oktato): number {
        return (
            (oktato.eloadasmod +
                oktato.felkeszultseg +
                oktato.segitokeszseg +
                oktato.teljesithetoseg) /
            4
        );
    }
}
