import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { oktato } from '../models/oktato';
import { tantargy } from '../models/tantargy';
import { OktatoService } from '../services/oktato.service';
import { TantargyService } from '../services/tantargy.service';

@Component({
    selector: 'app-to-admin',
    templateUrl: './to-admin.component.html',
    styleUrls: ['./to-admin.component.scss']
})
export class ToAdminComponent implements OnInit {
    public trainers?: oktato[];
    public subjects?: tantargy[];
    public timetableForm!: FormGroup;
    public chooser!: FormGroup;
    public options = [{ name: 'Tantargy' }, { name: 'Oktato' }];
    private nextClicked = false;
    private looker = false;

    constructor(
        private readonly oktatoServie: OktatoService,
        private readonly fb: FormBuilder,
        private readonly toast: HotToastService,
        public dialog: MatDialog,
        private readonly subjectService: TantargyService
    ) {}

    get segitokeszseg() {
        return (this.timetableForm.get('oktatoForm') as FormGroup).get(
            'segitokeszseg'
        );
    }

    get felkeszultseg() {
        return (this.timetableForm.get('oktatoForm') as FormGroup).get(
            'felkeszultseg'
        );
    }

    get eloadasmod() {
        return (this.timetableForm.get('oktatoForm') as FormGroup).get(
            'eloadasmod'
        );
    }

    get teljesithetoseg() {
        return (this.timetableForm.get('oktatoForm') as FormGroup).get(
            'teljesithetoseg'
        );
    }

    get nev() {
        return (this.timetableForm.get('oktatoForm') as FormGroup).get('nev');
    }

    get nehezseg() {
        return (this.timetableForm.get('subjectForm') as FormGroup).get(
            'nehezseg'
        );
    }

    get hasznossag() {
        return (this.timetableForm.get('subjectForm') as FormGroup).get(
            'hasznossag'
        );
    }

    get nev_sub() {
        return (this.timetableForm.get('subjectForm') as FormGroup).get(
            'nev_sub'
        );
    }

    get kredit() {
        return (this.timetableForm.get('subjectForm') as FormGroup).get(
            'kredit'
        );
    }

    get tipus() {
        return (this.timetableForm.get('subjectForm') as FormGroup).get(
            'tipus'
        );
    }

    get oktato() {
        return (this.timetableForm.get('subjectForm') as FormGroup).get(
            'oktato'
        );
    }

    get nap() {
        return (this.timetableForm.get('subjectForm') as FormGroup).get('nap');
    }

    get kido() {
        return (this.timetableForm.get('subjectForm') as FormGroup).get('kido');
    }

    get vido() {
        return (this.timetableForm.get('subjectForm') as FormGroup).get('vido');
    }

    // what xD
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public reload(): void {}

    public submit(): void {
        if (this.subjects?.length !== undefined) {
            for (let i = 0; i < this.subjects?.length; i++) {
                if (
                    this.subjects[i].nev_sub ===
                    (this.timetableForm.get('subjectForm') as FormGroup).value
                        .nev_sub
                ) {
                    this.toast.error('Ezt a tárgyat már felvette');
                    return;
                }
            }
        }

        if (this.nextClicked) {
            if ((this.timetableForm.get('oktatoForm') as FormGroup).valid) {
                this.oktatoServie
                    .addTrainer(
                        (this.timetableForm.get('oktatoForm') as FormGroup)
                            .value
                    )
                    ?.then(() => {
                        //  this.toast.loading("...");  // felesleges-> törlés
                        this.toast.success('Oktato sikeresen rogzitve');
                        this.timetableForm.reset();
                    });
            } else {
                return;
            }
        } else {
            if ((this.timetableForm.get('subjectForm') as FormGroup).valid) {
                this.subjectService
                    .addSubject(
                        (this.timetableForm.get('subjectForm') as FormGroup)
                            .value
                    )
                    ?.then(() => {
                        // this.toast.loading("..."); // felesleges-> törlés
                        this.toast.success('Tantárgy sikeresen rögzítve');
                        this.timetableForm.reset();
                    });
            } else {
                return;
            }
        }
    }

    public onNextClicked(variable: string): void {
        if (variable === 'oktato') {
            this.looker = true;
        } else {
            this.looker = false;
        }
        this.nextClicked = this.looker;
    }

    // ez akkor lehetne onDelete_oktato ha már rákövetkező a tantárgy és annak specifikáltad is a nevét,
    // ez az onDelete így általánosan mindkettőre vonatkozhat tantárgy vagy oktató
    public onDelete(oktato: oktato): void {
        this.oktatoServie.deleteTrainer(oktato);
    }

    public onDelete_tantargy(tantargy: tantargy): void {
        this.subjectService.deleteSubject(tantargy);
    }

    public ngOnInit(): void {
        this.oktatoServie.listTrainer()?.subscribe((oktato) => {
            this.trainers = oktato;
        });

        this.subjectService.listSubjects()?.subscribe((tantargy) => {
            this.subjects = tantargy;
        });

        this.chooser = this.fb.group({
            choose_type: [null]
        });

        this.timetableForm = this.fb.group({
            subjectForm: this.fb.group({
                nehezseg: new FormControl('', [
                    Validators.required,
                    Validators.max(5),
                    Validators.min(0)
                ]),
                hasznossag: new FormControl('', [
                    Validators.required,
                    Validators.max(5),
                    Validators.min(0)
                ]),
                nev_sub: new FormControl('', Validators.required),
                kredit: new FormControl('', [
                    Validators.required,
                    Validators.min(0)
                ]),
                oktato: new FormControl('', Validators.required),
                tipus: new FormControl('', Validators.required),
                nap: new FormControl('', Validators.required),
                kido: new FormControl('00:00', Validators.required),
                vido: new FormControl('00:00', Validators.required)
            }),
            oktatoForm: this.fb.group({
                segitokeszseg: new FormControl('', [
                    Validators.required,
                    Validators.max(10),
                    Validators.min(0)
                ]),
                felkeszultseg: new FormControl('', [
                    Validators.required,
                    Validators.max(10),
                    Validators.min(0)
                ]),
                eloadasmod: new FormControl('', [
                    Validators.required,
                    Validators.max(10),
                    Validators.min(0)
                ]),
                teljesithetoseg: new FormControl('', [
                    Validators.required,
                    Validators.max(10),
                    Validators.min(0)
                ]),
                nev: new FormControl('', [
                    Validators.required,
                    Validators.minLength(4)
                ])
            })
        });
    }
}
