import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { tantargy } from '../models/tantargy';
import { GenerateTableService } from '../services/generate-table.service';
import { UsersService } from '../services/users.service';

@Component({
    selector: 'app-table-generate',
    templateUrl: './table-generate.component.html',
    styleUrls: ['./table-generate.component.scss']
})
export class TableGenerateComponent implements OnInit {
    public data = new Map();
    // displayedColumns nincs sehol használva => kilehet törölni
    public displayedColumns: string[] = [
        'Hétfő',
        'Kedd',
        'Szerda',
        'Csütörtök',
        'Péntek'
    ];
    private generate_table!: tantargy[];
    private readonly user_id = sessionStorage.getItem('id');

    constructor(
        private readonly generateService: GenerateTableService,
        private readonly userService: UsersService
    ) {}

    public ngOnInit(): void {
        this.generateService
            .listGenerateTable()
            ?.pipe(take(1))
            .subscribe((data) => {
                this.generate_table = data;
                this.sortingSomeshow(this.generate_table, this.data);
            });
    }

    public delete(): void {
        this.generateService.removeGeneralTable();
    }

    public add_table(): void {
        this.userService.addMap(this.user_id!, this.generate_table);
    }

    private readonly sortingSomeshow = (data: any, tableData: any) => {
        const weekDays = {
            hetfo: '',
            kedd: '',
            szerda: '',
            csutortok: '',
            pentek: ''
        };

        data.sort((a: any, b: any) => (a.kido > b.kido ? -1 : -1)).map(
            (element: any) => {
                if (!tableData.has(element.kido)) {
                    tableData.set(`${element.kido}`, { ...weekDays });
                }
                tableData.get(`${element.kido}`)[element.nap] = {
                    nev: element.nev_sub,
                    goodness_index: element.goodness_index,
                    hasznossag: element.hasznossag,
                    nehezseg: element.nehezseg,
                    tipus: element.tipus
                };
            }
        );
    };
}
