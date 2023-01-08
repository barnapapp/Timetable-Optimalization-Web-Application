import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { oktato } from '../models/oktato';
import { tantargy } from '../models/tantargy';
import { OktatoService } from '../services/oktato.service';
import { TantargyService } from '../services/tantargy.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    public best_subject?: string;
    public best_trainer?: string;
    public worst_subject?: string;
    public worst_trainer?: string;
    public max_index?: number;
    public max_index2?: number;
    public min_index?: number;
    public min_index2?: number;
    public avg_hasznossag = 0;
    public avg_nehezseg = 0;
    public avg_goodness = 0;
    public avg_hasznossag_kotval = 0;
    public avg_nehezseg_kotval = 0;
    public avg_goodness_kotval = 0;
    public avg_hasznossag_kot = 0;
    public avg_nehezseg_kot = 0;
    public avg_goodness_kot = 0;
    public avg_eloadasmo = 0;
    public avg_felkeszultseg = 0;
    public avg_segitokeszseg = 0;
    public avg_teljesithetoseg = 0;
    public avg_goodness_okt = 0;
    public better_index_value = 0;
    public run_chekker = true;
    private arrayOfSubject?: Observable<tantargy>;
    private arrayOfTrainer?: Observable<oktato>;
    private length_sub = 0;
    private length_sub_kotval = 0;
    private length_sub_kot = 0;
    private length_okt = 0;

    constructor(subjects: TantargyService, trainers: OktatoService) {
        subjects
            .listSubjects()
            ?.pipe(take(1))
            .subscribe((items) => {
                this.max_index = 0;
                this.min_index = 10;
                this.arrayOfSubject = items;
                this.arrayOfSubject?.forEach((x) => {
                    if (this.max_index && x.goodness_index > this.max_index) {
                        this.max_index = x.goodness_index;
                    }
                    if (this.min_index && x.goodness_index < this.min_index) {
                        this.min_index = x.goodness_index;
                    }
                    if (x.goodness_index === this.max_index) {
                        this.best_subject = x.nev_sub;
                    }
                    if (x.goodness_index === this.min_index) {
                        this.worst_subject = x.nev_sub;
                    }

                    if (x.tipus === 'Szabvál') {
                        this.avg_hasznossag += x.hasznossag;
                        this.avg_nehezseg += x.nehezseg;
                        this.avg_goodness += x.goodness_index;
                        this.length_sub++;

                        this.avg_hasznossag /= this.length_sub;
                        this.avg_hasznossag = +this.avg_hasznossag.toFixed(3);
                        this.avg_nehezseg /= this.length_sub;
                        this.avg_nehezseg = +this.avg_nehezseg.toFixed(3);
                        this.avg_goodness /= this.length_sub;
                        this.avg_goodness = +this.avg_goodness.toFixed(3);
                    }

                    if (x.tipus === 'Kötvál') {
                        this.avg_hasznossag_kotval += x.hasznossag;
                        this.avg_nehezseg_kotval += x.nehezseg;
                        this.avg_goodness_kotval += x.goodness_index;
                        this.length_sub_kotval++;

                        this.avg_hasznossag_kotval /= this.length_sub_kotval;
                        this.avg_hasznossag_kotval =
                            +this.avg_hasznossag_kotval.toFixed(3);
                        this.avg_nehezseg_kotval /= this.length_sub_kotval;
                        this.avg_nehezseg_kotval =
                            +this.avg_nehezseg_kotval.toFixed(3);
                        this.avg_goodness_kotval /= this.length_sub_kotval;
                        this.avg_goodness_kotval =
                            +this.avg_goodness_kotval.toFixed(3);
                    }

                    if (x.tipus === 'Kötelező') {
                        this.avg_hasznossag_kot += x.hasznossag;
                        this.avg_nehezseg_kot += x.nehezseg;
                        this.avg_goodness_kot += x.goodness_index;
                        this.length_sub_kot++;

                        this.avg_hasznossag_kot /= this.length_sub_kot;
                        this.avg_hasznossag_kot =
                            +this.avg_hasznossag_kot.toFixed(3);
                        this.avg_nehezseg_kot /= this.length_sub_kot;
                        this.avg_nehezseg_kot =
                            +this.avg_nehezseg_kot.toFixed(3);
                        this.avg_goodness_kot /= this.length_sub_kot;
                        this.avg_goodness_kot =
                            +this.avg_goodness_kot.toFixed(3);
                    }

                    if (this.avg_goodness > this.avg_goodness_kot) {
                        this.better_index_value = this.avg_goodness;
                    } else {
                        this.better_index_value = this.avg_goodness_kot;
                    }

                    if (this.better_index_value < this.avg_goodness_kotval) {
                        this.better_index_value = this.avg_goodness_kotval;
                    }
                });
            });

        trainers.listTrainer()?.subscribe((trainer) => {
            this.arrayOfTrainer = trainer;
            this.max_index2 = 0;
            this.min_index2 = 10;
            this.arrayOfTrainer?.forEach((y) => {
                if (this.max_index2 && y.goodness_index > this.max_index2) {
                    this.max_index2 = y.goodness_index;
                }
                if (this.min_index2 && y.goodness_index < this.min_index2) {
                    this.min_index2 = y.goodness_index;
                }
                if (y.goodness_index === this.max_index2) {
                    this.best_trainer = y.nev;
                }
                if (y.goodness_index === this.min_index2) {
                    this.worst_trainer = y.nev;
                }

                this.avg_eloadasmo += y.eloadasmod;
                this.avg_felkeszultseg += y.felkeszultseg;
                this.avg_segitokeszseg += y.segitokeszseg;
                this.avg_teljesithetoseg += y.teljesithetoseg;
                this.avg_goodness_okt += y.goodness_index;
                this.length_okt++;

                this.avg_eloadasmo /= this.length_okt;
                this.avg_eloadasmo = +this.avg_eloadasmo.toFixed(3);
                this.avg_felkeszultseg /= this.length_okt;
                this.avg_felkeszultseg = +this.avg_felkeszultseg.toFixed(3);
                this.avg_segitokeszseg /= this.length_okt;
                this.avg_segitokeszseg = +this.avg_segitokeszseg.toFixed(3);
                this.avg_teljesithetoseg /= this.length_okt;
                this.avg_teljesithetoseg = +this.avg_teljesithetoseg.toFixed(3);
                this.avg_goodness_okt /= this.length_okt;
                this.avg_goodness_okt = +this.avg_goodness_okt.toFixed(3);
            });
        });
        this.run_chekker = false;
    }
}
