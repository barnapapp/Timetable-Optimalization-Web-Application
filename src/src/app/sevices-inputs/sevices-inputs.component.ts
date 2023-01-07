import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { tantargy } from '../models/tantargy';
import { TableService } from '../services/table.service';
import { TantargyService } from '../services/tantargy.service';
import { TablesComponent } from '../tables/tables.component';

@Component({
    selector: 'app-sevices-inputs',
    templateUrl: './sevices-inputs.component.html',
    styleUrls: ['./sevices-inputs.component.scss']
})
export class SevicesInputsComponent implements OnInit {
    // panelOpenState = false;
    public myControl = new FormControl('');
    public filteredOptions?: Observable<tantargy[]>;
    public choosed: any;
    public subject: any; // erre nincs szükség mert sehol nincsen használva, private readonly subject: any -> unused
    public max_value_oktato: String[] = [
        '(10)',
        '(10)',
        '(10)',
        '',
        '',
        '(10)',
        '(10)'
    ];
    public max_value_tantagy: String[] = ['(5)', '(5)', '(-)', '(5)'];
    private subjects!: tantargy[];
    private types = 'Kötelező';
    private labelName?: string;
    private timetable_sub?: tantargy[] = [];
    private readonly htmlDOM_sub: string[] = [];

    constructor(
        private readonly subjectservice: TantargyService,
        private readonly tableservice: TableService,
        private readonly toast: HotToastService,
        public dialog: MatDialog
    ) {}

    public ngOnInit(): void {
        this.tableservice.listTimetable_data()?.subscribe((data) => {
            this.timetable_sub = data;
        });

        if (this.timetable_sub !== undefined) {
            for (let k = 0; k < this.timetable_sub?.length; k++) {
                this.htmlDOM_sub.push(this.timetable_sub[k].nev_sub);
            }
        }

        this.subjectservice.listSubjects()?.subscribe((subject) => {
            this.subjects = subject;
            this.filteredOptions = this.myControl.valueChanges.pipe(
                startWith(''),
                map((value) => this._filter(value || ''))
            );
            this.myControl.valueChanges.subscribe((item) => {
                for (let i = 0; i < this.subjects.length; i++) {
                    if (this.subjects[i].nev_sub === item) {
                        this.choosed = this.subjects[i];
                    }
                }
            });
        });
    }

    public openDialog() {
        this.dialog.open(TablesComponent, {
            disableClose: true
        });
    }

    public selectedTabValue(event: any): void {
        this.labelName = event.tab.textLabel;
        if (this.labelName === 'Kötelező') {
            this.types = 'Kötelező';
            this.ngOnInit();
        } else if (this.labelName === 'Kötelezően választható') {
            this.types = 'Kötvál';
            this.ngOnInit();
        } else if (this.labelName === 'Szabadon választható') {
            this.types = 'Szabvál';
            this.ngOnInit();
        }
    }

    // return type
    public add_subject() {
        if (this.timetable_sub?.length !== undefined) {
            for (let i = 0; i < this.timetable_sub?.length; i++) {
                if (this.choosed.nev_sub === this.timetable_sub[i].nev_sub) {
                    this.toast.warning(
                        'Ezt a tárgyat már felvetted az órarendbe!'
                    );
                    return;
                }
                if (
                    (this.choosed.kido === this.timetable_sub[i].kido &&
                        this.choosed.nap === this.timetable_sub[i].nap) ||
                    (this.choosed.vido === this.timetable_sub[i].vido &&
                        this.choosed.nap === this.timetable_sub[i].nap) ||
                    (this.choosed.kido < this.timetable_sub[i].kido &&
                        this.choosed.vido > this.timetable_sub[i].kido &&
                        this.choosed.nap === this.timetable_sub[i].nap) ||
                    (this.choosed.kido < this.timetable_sub[i].vido &&
                        this.choosed.vido > this.timetable_sub[i].vido &&
                        this.choosed.nap === this.timetable_sub[i].nap)
                ) {
                    this.toast.warning(
                        `Sajnos az időpont ütközik a ${this.timetable_sub[i].nev_sub} tárgy időpontjával`
                    );
                    return;
                }
            }
        }
        return this.tableservice.addTimetable(this.choosed)?.then(() => {
            this.toast.success('Tantárgy sikeresen rögzítve');
        });
    }

    public delete_subject(): void {
        this.tableservice.deleteTimetable(this.choosed);
        this.toast.success('Tantárgy sikeresen eltávolítva');
    }

    private _filter(value: string): tantargy[] {
        return this.subjects.filter(
            (option) =>
                option.nev_sub.includes(value) && option.tipus === this.types
        );
    }
}
