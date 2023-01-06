import { Component, OnInit } from '@angular/core';
import { tantargy } from '../models/tantargy';
import { GenerateTableService } from '../services/generate-table.service';
import { take } from 'rxjs/operators';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-table-generate',
  templateUrl: './table-generate.component.html',
  styleUrls: ['./table-generate.component.scss']
})
export class TableGenerateComponent implements OnInit {

  generate_table!: tantargy[];
  user_id = sessionStorage.getItem('id');
  displayedColumns: string[] = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek'];
  data = new Map();


  constructor(private generateService: GenerateTableService,
              private userService: UsersService) { }

  ngOnInit(): void {
    this.generateService.listGenerateTable()?.pipe(take(1)).subscribe((data) => {
      this.generate_table = data;
      this.sortingSomeshow(this.generate_table, this.data)
    })
  }


  delete() {
    this.generateService.removeGeneralTable();
  }


  sortingSomeshow = (data: any, tableData: any) => {
    
    const weekDays = {
      hetfo: '',
      kedd: '',
      szerda: '',
      csutortok: '',
      pentek: '',
    };
    
    data.sort((a: any, b: any) => (a.kido > b.kido ? -1 : -1))
    .map((element: any) => {
      if(!tableData.has(element.kido)) {
        tableData.set(`${element.kido}`, { ...weekDays });
      }
        tableData.get(`${element.kido}`)[element.nap] = {
          nev: element.nev_sub,
          goodness_index: element.goodness_index,
          hasznossag: element.hasznossag,
          nehezseg: element.nehezseg,
          tipus: element.tipus
        };
    });
  };

  add_table() {
    this.userService.addMap(this.user_id!, this.generate_table);
  }

}
