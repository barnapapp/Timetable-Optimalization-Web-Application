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

    public addTrainer(oktato: oktato): Promise<void> | undefined {
        oktato.id = this.afs.createId();
        oktato.goodness_index = +this.index_of_goodness(oktato).toFixed(3);
        return this.oktatoCollection?.doc(oktato.id).set(oktato);
    }

    public listTrainer(): Observable<any> | undefined {
        return this.oktatok;
    }

    public deleteTrainer(oktato: oktato): void {
        this.oktatoCollection?.doc(oktato.id).delete();
    }

    public updateTrainer(oktato: oktato): Promise<void> | undefined {
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
