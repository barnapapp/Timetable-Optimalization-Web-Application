import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { oktato } from '../models/oktato';


@Injectable({
  providedIn: 'root'
})
export class OktatoService {

  oktatoCollection?: AngularFirestoreCollection<oktato>;
  oktatok?: Observable<any>;

  constructor(private afs: AngularFirestore) {
      this.oktatoCollection = this.afs.collection('oktato');
      this.oktatok = this.afs.collection('oktato').valueChanges();
   }


  addTrainer(oktato: oktato) {
    oktato.id = this.afs.createId();
    oktato.goodness_index = +this.index_of_goodness(oktato).toFixed(3);
    return this.oktatoCollection?.doc(oktato.id).set(oktato);
  }

  listTrainer() {
    return this.oktatok;
  }

  deleteTrainer(oktato: oktato) {
    this.oktatoCollection?.doc(oktato.id).delete();
  }


  updateTrainer(oktato: oktato) {
      return this.oktatoCollection?.doc(oktato.id).set(oktato);
    }

  index_of_goodness(oktato: oktato) {
    return (oktato.eloadasmod + oktato.felkeszultseg + oktato.segitokeszseg + oktato.teljesithetoseg) / 4;
  }

}
