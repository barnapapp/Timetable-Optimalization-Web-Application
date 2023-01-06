import { Component, Inject, OnInit } from '@angular/core';
import { tantargy } from '../models/tantargy';
import { TableService } from '../services/table.service';
import { week } from '../models/week';
import { take } from 'rxjs/operators';
import { UsersService } from '../services/users.service';


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  tables_data!: tantargy[];
  displayedColumns: string[] = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek'];
  data = new Map();
  user_id = sessionStorage.getItem('id');
  data_array: any = [];
  
  constructor(private tablservice: TableService,
              private userService: UsersService) { }

  ngOnInit(): void {
   this.tablservice.listTimetable_data()?.pipe(take(1)).subscribe((data) => {
     this.tables_data = data;
     console.log(this.tables_data)
 //    this.tablesData = this.sorted_data(this.tables_data);
    this.sortingSomeshow(this.tables_data, this.data);
   });
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
          tipus: element.tipus,
          kido: element.kido,
          vido: element.vido
        };
    });
  };



  firebase_empty() {
    this.tablservice.deleteAll();
  }

  add_table() {
    this.userService.addMap(this.user_id!, this.tables_data);
  }

}
