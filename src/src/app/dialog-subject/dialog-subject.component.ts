import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { oktato } from '../models/oktato';
import { tantargy } from '../models/tantargy';
import { OktatoService } from '../services/oktato.service';
import { TantargyService } from '../services/tantargy.service';

@Component({
  selector: 'app-dialog-subject',
  templateUrl: './dialog-subject.component.html',
  styleUrls: ['./dialog-subject.component.scss']
})
export class DialogSubjectComponent implements OnInit {

  @Input() subject?: tantargy;
  subjectForm!: FormGroup;
  obj_sub_id?: string;
  trainers?: oktato[];

  constructor(private subjectservice: TantargyService,
              private trainersdouplicateservice: OktatoService,
              private fb: FormBuilder,
              private toast: HotToastService) { }

  ngOnInit(): void {
      this.trainersdouplicateservice.listTrainer()?.subscribe((trainer) => {
        this.trainers = trainer;
      })


    this.obj_sub_id = this.subject?.id;
    this.subjectForm = this.fb.group({
      nehezseg: new FormControl('', [Validators.required, Validators.max(5), Validators.min(0)]),
      hasznossag: new FormControl('', [Validators.required, Validators.max(10), Validators.min(0)]),
      kredit: new FormControl('', [Validators.required, Validators.min(0)]),
      nev: new FormControl('', Validators.required),
      nap: new FormControl('', Validators.required),
      kido: new FormControl('00:00', Validators.required),
      vido: new FormControl('00:00', Validators.required),
      oktato: new FormControl('', Validators.required),
      tipus: new FormControl('', Validators.required),
      id: this.obj_sub_id as string
    })
  }


  get nehezseg() {
    return this.subjectForm?.get('nehezseg');
  }

  get hasznossag() {
    return this.subjectForm?.get('hasznossag');
  }

  get kredit() {
    return this.subjectForm?.get('kredit');
  }

  get nev() {
    return this.subjectForm?.get('nev');
  }

  get nap() {
    return this.subjectForm?.get('nap');
  }

  get kido() {
    return this.subjectForm?.get('kido');
  }

  get vido() {
    return this.subjectForm?.get('vido');
  }

  get oktato() {
    return this.subjectForm?.get('oktato');
  }

  get tipus() {
    return this.subjectForm?.get('tipus');
  }



  submit() {
    if(!this.subjectForm?.valid) {
      return;
    }

    this.subjectservice.updateSubject(this.subjectForm.value)?.then( _ => {
        this.toast.success("Tantargy sikeresen modositva");
    })
  }





}
