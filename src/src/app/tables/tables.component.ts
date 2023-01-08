import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { tantargy } from '../models/tantargy';
import { TableService } from '../services/table.service';
import { UsersService } from '../services/users.service';

@Component({
    selector: 'app-tables',
    templateUrl: './tables.component.html',
    styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
    public data = new Map();
    private tables_data!: tantargy[];
    private readonly user_id = sessionStorage.getItem('id');

    constructor(
        private readonly tablservice: TableService,
        private readonly userService: UsersService
    ) {}

    public ngOnInit(): void {
        this.tablservice
            .listTimetable_data()
            ?.pipe(take(1))
            .subscribe((data) => {
                this.tables_data = data;
                this.sortingSomeshow(this.tables_data, this.data);
            });
    }

    public firebase_empty(): void {
        this.tablservice.deleteAll();
    }

    public add_table(): void {
        this.userService.addMap(this.user_id!, this.tables_data);
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
                    tipus: element.tipus,
                    kido: element.kido,
                    vido: element.vido
                };
            }
        );
    };
}
