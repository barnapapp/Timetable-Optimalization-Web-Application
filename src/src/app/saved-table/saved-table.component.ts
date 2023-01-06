import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { take } from 'rxjs/operators';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-saved-table',
  templateUrl: './saved-table.component.html',
  styleUrls: ['./saved-table.component.scss']
})
export class SavedTableComponent implements OnInit {

  saved_array: any = [];
  array: any = [];
  objectToArray: any;
  dataMap = new Map();
  profil_change = false;
  @Output() valueChange = new EventEmitter();

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.userService.listMaps()?.pipe(take(1)).subscribe((data) => {
      this.array = data;
      this.saved_array = this.array[0];
      this.objectToArray = Object.values(this.saved_array);
      this.sortingSomeshow(this.objectToArray, this.dataMap);
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


  delete_table() {    
    this.userService.deleteMap();
    this.valueChange.emit(this.profil_change);
    this.ngOnInit();
  }


}
