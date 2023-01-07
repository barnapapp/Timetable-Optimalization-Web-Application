import { Component, Input, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { oktato } from '../models/oktato';
import { OktatoService } from '../services/oktato.service';

@Component({
    selector: 'app-dialogtmp',
    templateUrl: './dialogtmp.component.html',
    styleUrls: ['./dialogtmp.component.scss']
})
export class DialogtmpComponent implements OnInit {
    @Input() public trainer!: oktato;
    public trainerForm!: FormGroup;
    private obj_id!: string;

    constructor(
        private readonly oktatoServie: OktatoService,
        private readonly fb: FormBuilder,
        private readonly toast: HotToastService
    ) {}

    get nev() {
        return this.trainerForm.get('nev');
    }

    get segitokeszseg() {
        return this.trainerForm.get('segitokeszseg');
    }

    get felkeszultseg() {
        return this.trainerForm.get('felkeszultseg');
    }

    get eloadasmod() {
        return this.trainerForm.get('eloadasmod');
    }

    get teljesithetoseg() {
        return this.trainerForm.get('teljesithetoseg');
    }

    public ngOnInit(): void {
        this.obj_id = this.trainer.id;
        this.trainerForm = this.fb.group({
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
            nev: new FormControl('', [
                Validators.required,
                Validators.minLength(4)
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
            id: this.obj_id as string
        });
    }

    public submit(): void {
        if (!this.trainerForm.valid) {
            return;
        }

        this.oktatoServie.updateTrainer(this.trainerForm.value)?.then(() => {
            this.toast.success('Oktato sikeresen modositva');
        });
    }
}
