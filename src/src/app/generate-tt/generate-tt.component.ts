import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { tantargy } from '../models/tantargy';
import { GenerateTableService } from '../services/generate-table.service';
import { TantargyService } from '../services/tantargy.service';
import {MatDialog} from '@angular/material/dialog';
import { TableGenerateComponent } from '../table-generate/table-generate.component';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-generate-tt',
  templateUrl: './generate-tt.component.html',
  styleUrls: ['./generate-tt.component.scss']
})
export class GenerateTtComponent implements OnInit {


  best_kretan: number[] = [];
  best_kreokt: number[] = [];
  best_tantargy: number[] = [];
  better_tantargy: tantargy[] = [];
  best_number: number = 0;
  best_oktato: number[] = [];
  get_tantargy: tantargy[] = [];
  diff_szabv: number = 0;
  diff_kotv: number = 0;
  diff_kot: number = 0;
  sum_szabvKredit: number = 0;
  sum_kotvKredit: number = 0;
  sum_kotKredit: number = 0;
  trainer_length: number = 1;
  delete_item: number[] = [];
  tmp_tantargy: tantargy[] = [];
  delete_item_okt: number[] = [];
  tmp_tantargy_okt: tantargy[] = [];
  prev_kot_sub: number = 0;
  prev_kotv_sub: number = 0;
  prev_szab_sub: number = 0;
  prev_kot_tan: number = 0;
  prev_kotv_tan: number = 0;
  prev_szab_tan: number = 0;
  prev_kot_kredok: number = 0;
  prev_kotv_kredok: number = 0;
  prev_szab_kredok: number = 0;
  prev_szab_kretan: number = 0;
  prev_kotv_kretan: number = 0;
  prev_kot_kretan: number = 0;
  kreditForm!: FormGroup;
  prev_name_kotval: string = ""
  min_szab_okt = 0;
  min_kot_okt = 0;
  min_kotv_okt = 0;
  szabv_array: number[] = [];
  kotv_array: number[] = [];
  kot_array: number[] = [];
  delete_item_kredok: number[] = [];
  tmp_kredok: tantargy[] = [];
  delete_item_kretan: number[] = [];
  tmp_kretan: tantargy[] = [];

  constructor(private subjects: TantargyService,
              private fb: FormBuilder,
              private generateService: GenerateTableService,
              public dialog: MatDialog,
              private userService: UsersService) { }


  ngOnInit(): void {
    this.subjects.listSubjects()?.subscribe((item) => {
      this.get_tantargy = item;
      this.get_tantargy.map((item) => {
        switch(item.tipus) {
          case "Szabvál":
            this.sum_szabvKredit += item.kredit;
            this.szabv_array.push(item.kredit);
            break;
          case "Kötelező":
            this.sum_kotKredit += item.kredit;
            this.kot_array.push(item.kredit);
            break;
          case "Kötvál":
            this.sum_kotvKredit += item.kredit;
            this.kotv_array.push(item.kredit);
            break;
        }
        this.best_tantargy.push(item.goodness_index);
        this.best_oktato.push(item.oktato.goodness_index);
        this.best_kreokt.push(item.oktato.goodness_index * item.kredit);
        this.best_kretan.push(item.goodness_index * item.kredit);
      });  
    });
    
      this.kreditForm = this.fb.group({
        kot_kredit: new FormControl(null, Validators.required),
        kotv_kredit: new FormControl(null, Validators.required),
        szabv_kredit: new FormControl(null, Validators.required),
        opt_sub: new FormControl(null, Validators.required)
      });
  

  }
  
 


  get kot_kredit() {
    return this.kreditForm?.get('kot_kredit')?.value;
  }

  get kotv_kredit() {
    return this.kreditForm.get('kotv_kredit')?.value;
  }

  get szabv_kredit() {
    return this.kreditForm.get('szabv_kredit')?.value;
  }

  get opt_sub() {
    return this.kreditForm.get('opt_sub')?.value;
  }

  delete_array() {
    
    if(!this.kreditForm.valid) {
      return;
    }
    
    this.min_kot_okt = Math.min(...this.kot_array);
    this.min_kotv_okt = Math.min(...this.kotv_array);
    this.min_szab_okt = Math.min(...this.szabv_array);


    this.better_tantargy = [];
    this.best_number = 0;
    this.diff_szabv = this.szabv_kredit;
    this.diff_kotv = this.kotv_kredit;
    this.diff_kot = this.kot_kredit; 
    this.prev_kotv_sub = 0;
    this.prev_kot_sub = 0;
    this.prev_szab_sub = 0;
    this.prev_kot_tan = 0;
    this.prev_kotv_tan = 0;
    this.prev_szab_tan = 0;
    this.prev_kot_kredok = 0;
    this.prev_kotv_kredok = 0;
    this.prev_szab_kredok = 0;
    this.prev_kot_kretan = 0;
    this.prev_kotv_kretan = 0;
    this.prev_szab_kretan = 0;


    if(this.delete_item.length != 0) {
      this.delete_item.map((item) => {
        this.best_tantargy.push(item);
      }); 
      this.delete_item = [];
    }

    if(this.tmp_tantargy.length != 0) {
      this.tmp_tantargy.map((element) => {
        this.get_tantargy.push(element);
      });
      this.tmp_tantargy = [];
    }

    if(this.delete_item_okt.length != 0) {
      this.delete_item_okt.map((item) => {
        this.best_oktato.push(item);
      });
      this.delete_item_okt = [];
    }

    if(this.tmp_tantargy_okt.length != 0) {
      this.tmp_tantargy_okt.map((item) => {
        this.get_tantargy.push(item);
      });
      this.tmp_tantargy_okt = [];
    }
    
    if(this.delete_item_kredok.length != 0) {
      this.delete_item_kredok.map((item) => {
        this.best_kreokt.push(item);
      });
      this.delete_item_kredok = [];
    }

    if(this.tmp_kredok.length != 0) {
      this.tmp_kredok.map((item) => {
        this.get_tantargy.push(item);
      });
      this.tmp_kredok = [];
    }

    if(this.delete_item_kretan.length != 0) {
      this.delete_item_kretan.map((item) => {
        this.best_kretan.push(item);
      });
      this.delete_item_kretan = [];
    }

    if(this.tmp_kretan.length != 0) {
      this.tmp_kretan.map((item) => {
        this.get_tantargy.push(item);
      })
      this.tmp_kretan = [];
    }    

  
  }


  openDialog() {
    const dialogRef = this.dialog.open(TableGenerateComponent, {disableClose: true});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  delete() {
    this.generateService.removeGeneralTable();
  }

  generate() {

    let delete_index = 0;
    let index = 0;
    let index_tan = 0;
    let index_kreokt = 0;
    let index_kretan = 0;

    if(!this.kreditForm.valid) {
      return;
    }

    if(this.kot_kredit > this.sum_kotKredit || this.kotv_kredit > this.sum_kotvKredit || this.szabv_kredit > this.sum_szabvKredit) {
      console.log("Nincs ennyi kredit felveve.");
      return;
    }

       switch(this.opt_sub) {
         case "tantargy":
            this.best_tantargy.reduce((acc: number[], val) => {
              acc[0] = (acc[0] === undefined || val > acc[0]) ? val : acc[0];
              this.best_number = acc[0];
              return acc;
            }, []);

            for(let o = 0; o < this.best_tantargy.length; o++) {
              if(this.best_tantargy[o] == this.best_number) {
                index_tan = o;
              }
            }

            var best_subject = this.get_tantargy.find((item, index) => {
              delete_index = index;
              return item.goodness_index == this.best_number; 
            });
            
              if(best_subject?.tipus == "Szabvál" && this.prev_szab_tan < this.szabv_kredit) {
                this.diff_szabv = this.szabv_kredit - this.prev_szab_tan;
                if(this.diff_szabv >= best_subject.kredit) {
                  this.prev_szab_tan += best_subject.kredit;
                  this.better_tantargy.push(best_subject);
                  this.generateService.addGeneralTable(best_subject);
                }
              } else if(best_subject?.tipus == "Kötelező" && this.prev_kot_tan < this.kot_kredit) {
                this.diff_kot = this.kot_kredit - this.prev_kot_tan;
                if(this.diff_kot >= best_subject.kredit) {
                  this.prev_kot_tan += best_subject.kredit;
                  this.better_tantargy.push(best_subject);
                  this.generateService.addGeneralTable(best_subject);
                }
              } else if(best_subject?.tipus == "Kötvál" && this.prev_kotv_tan < this.kotv_kredit) {
                this.diff_kotv = this.kotv_kredit - this.prev_kotv_tan;
                if(this.diff_kotv >= best_subject.kredit) {
                  this.prev_kotv_tan += best_subject.kredit
                  this.better_tantargy.push(best_subject);
                  this.generateService.addGeneralTable(best_subject);
                }
              } 
        
              this.delete_item.push(this.best_tantargy[index_tan]);
              this.tmp_tantargy.push(this.get_tantargy[delete_index]);
              this.get_tantargy.splice(delete_index, 1);  
              this.best_tantargy.splice(index_tan, 1);
            break;
         case "oktato":

            this.best_oktato.reduce((acc: number[], val) => {
              acc[0] = (acc[0] === undefined || val > acc[0]) ? val : acc[0];
              this.best_number = acc[0];
              return acc;
            }, []);
       
            for(let i = 0; i < this.best_oktato.length; i++) {
              if(this.best_oktato[i] == this.best_number) {
                index = i;
              }
            }
         
            var best_trainer = this.get_tantargy.find((item, index) => {
              delete_index = index;
              return item.oktato.goodness_index == this.best_number; 
            });
            
              if(best_trainer?.tipus == "Szabvál" && this.prev_szab_sub < this.szabv_kredit) {
                this.diff_szabv = this.szabv_kredit - this.prev_szab_sub;
                if(this.diff_szabv >= best_trainer.kredit) {
                  this.prev_szab_sub += best_trainer.kredit;
                  this.better_tantargy.push(best_trainer);
                  this.generateService.addGeneralTable(best_trainer);
                }
              } else if(best_trainer?.tipus == "Kötelező" && this.prev_kot_sub < this.kot_kredit) {
                this.diff_kot = this.kot_kredit - this.prev_kot_sub;
                if(this.diff_kot >= best_trainer.kredit) {
                  this.prev_kot_sub += best_trainer.kredit;
                  this.better_tantargy.push(best_trainer);
                  this.generateService.addGeneralTable(best_trainer);
                }
              } else if(best_trainer?.tipus == "Kötvál" && this.prev_kotv_sub < this.kotv_kredit) {
                this.diff_kotv = this.kotv_kredit - this.prev_kotv_sub;
                if(this.diff_kotv >= best_trainer.kredit) {
                  this.prev_kotv_sub += best_trainer.kredit;
                  this.better_tantargy.push(best_trainer);
                  this.generateService.addGeneralTable(best_trainer);
                }
              }
                  
            
            this.delete_item_okt.push(this.best_oktato[index]);
            this.tmp_tantargy_okt.push(this.get_tantargy[delete_index]);
            this.get_tantargy.splice(delete_index, 1);
            this.best_oktato.splice(index, 1);

            

            break;
          case "kredit_okt":

              this.best_kreokt.reduce((acc: number[], val) => {
                acc[0] = (acc[0] === undefined || val > acc[0]) ? val : acc[0];
                this.best_number = acc[0];
                return acc;
              }, []);

              for(let i = 0; i < this.best_kreokt.length; i++) {
                if(this.best_kreokt[i] == this.best_number) {
                  index_kreokt = i;
                }
              }
              
              var best_kreoktato = this.get_tantargy.find((item, index) => {
                delete_index = index;
                return item.oktato.goodness_index * item.kredit == this.best_number; 
              });

              if(best_kreoktato?.tipus == "Szabvál" && this.prev_szab_kredok < this.szabv_kredit) {
                this.diff_szabv = this.szabv_kredit - this.prev_szab_kredok;
                if(this.diff_szabv >= best_kreoktato.kredit) {
                  this.prev_szab_kredok += best_kreoktato.kredit;
                  this.better_tantargy.push(best_kreoktato);
                  this.generateService.addGeneralTable(best_kreoktato);
                }
              } else if(best_kreoktato?.tipus == "Kötelező" && this.prev_kot_kredok < this.kot_kredit) {
                this.diff_kot = this.kot_kredit - this.prev_kot_kredok;
                if(this.diff_kot >= best_kreoktato.kredit) {
                  this.prev_kot_kredok += best_kreoktato.kredit;
                  this.better_tantargy.push(best_kreoktato);
                  this.generateService.addGeneralTable(best_kreoktato);
                }
              } else if(best_kreoktato?.tipus == "Kötvál" && this.prev_kotv_kredok < this.kotv_kredit) {
                this.diff_kotv = this.kotv_kredit - this.prev_kotv_kredok;
                if(this.diff_kotv >= best_kreoktato.kredit) {
                  this.prev_kotv_kredok += best_kreoktato.kredit;
                  this.better_tantargy.push(best_kreoktato);
                  this.generateService.addGeneralTable(best_kreoktato);
                }
              }
                  
            
            this.delete_item_kredok.push(this.best_kreokt[index_kreokt]);
            this.tmp_kredok.push(this.get_tantargy[delete_index]);
            this.get_tantargy.splice(delete_index, 1);
            this.best_kreokt.splice(index_kreokt, 1);


            break;
          case "kredit_tant":

          this.best_kretan.reduce((acc: number[], val) => {
            acc[0] = (acc[0] === undefined || val > acc[0]) ? val : acc[0];
            this.best_number = acc[0];
            return acc;
          }, []);

          for(let i = 0; i < this.best_kretan.length; i++) {
            if(this.best_kretan[i] == this.best_number) {
              index_kretan = i;
            }
          }

          var best_kretantargy = this.get_tantargy.find((item, index) => {
            delete_index = index;
            return item.goodness_index * item.kredit == this.best_number; 
          });

          if(best_kretantargy?.tipus == "Szabvál" && this.prev_szab_kretan < this.szabv_kredit) {
            this.diff_szabv = this.szabv_kredit - this.prev_szab_kretan;
            if(this.diff_szabv >= best_kretantargy.kredit) {
              this.prev_szab_kretan += best_kretantargy.kredit;
              this.better_tantargy.push(best_kretantargy);
              this.generateService.addGeneralTable(best_kretantargy);
            }
          } else if(best_kretantargy?.tipus == "Kötelező" && this.prev_kot_kretan < this.kot_kredit) {
            this.diff_kot = this.kot_kredit - this.prev_kot_kretan;
            if(this.diff_kot >= best_kretantargy.kredit) {
              this.prev_kot_kretan += best_kretantargy.kredit;
              this.better_tantargy.push(best_kretantargy);
              this.generateService.addGeneralTable(best_kretantargy);
            }
          } else if(best_kretantargy?.tipus == "Kötvál" && this.prev_kotv_kretan < this.kotv_kredit) {
            this.diff_kotv = this.kotv_kredit - this.prev_kotv_kretan;
            if(this.diff_kotv >= best_kretantargy.kredit) {
              this.prev_kotv_kretan += best_kretantargy.kredit;
              this.better_tantargy.push(best_kretantargy);
              this.generateService.addGeneralTable(best_kretantargy);
            }
          }

          this.delete_item_kretan.push(this.best_kretan[index_kretan]);
          this.tmp_kretan.push(this.get_tantargy[delete_index]);
          this.get_tantargy.splice(delete_index, 1);
          this.best_kretan.splice(index_kretan, 1);
          break;
       }

       
    console.log(this.better_tantargy);
       

    if(this.opt_sub === "oktato") {
      if((this.prev_szab_sub < this.szabv_kredit || this.prev_kotv_sub < this.kotv_kredit || this.prev_kot_sub < this.kot_kredit) 
        && ((this.prev_szab_sub + this.min_szab_okt <= this.szabv_kredit) || (this.prev_kot_sub + this.min_kot_okt <= this.kot_kredit) || (this.prev_kotv_sub + this.min_kotv_okt <= this.kotv_kredit))) {
        this.generate();
      } else {
        this.openDialog();
      }
    } else if(this.opt_sub == "tantargy") {
      if((this.prev_szab_tan < this.szabv_kredit || this.prev_kotv_tan < this.kotv_kredit || this.prev_kot_tan < this.kot_kredit) 
        && ((this.prev_szab_tan + this.min_szab_okt <= this.szabv_kredit) || (this.prev_kot_tan + this.min_kot_okt <= this.kot_kredit) || (this.prev_kotv_tan + this.min_kotv_okt <= this.kotv_kredit))) {
        this.generate();
      } else {
        this.openDialog();
      }
    } else if(this.opt_sub == "kredit_okt") {
      if((this.prev_szab_kredok < this.szabv_kredit || this.prev_kotv_kredok < this.kotv_kredit || this.prev_kot_kredok < this.kot_kredit) 
        && ((this.prev_szab_kredok + this.min_szab_okt <= this.szabv_kredit) || (this.prev_kot_kredok + this.min_kot_okt <= this.kot_kredit) || (this.prev_kotv_kredok + this.min_kotv_okt <= this.kotv_kredit))) {
        this.generate();
      } else {
        this.openDialog();
      }
    } else if(this.opt_sub == "kredit_tant") {
      if((this.prev_szab_kretan < this.szabv_kredit || this.prev_kotv_kretan < this.kotv_kredit || this.prev_kot_kretan < this.kot_kredit) 
        && ((this.prev_szab_kretan + this.min_szab_okt <= this.szabv_kredit) || (this.prev_kot_kretan + this.min_kot_okt <= this.kot_kredit) || (this.prev_kotv_kretan + this.min_kotv_okt <= this.kotv_kredit))) {
        this.generate();
      } else {
        this.openDialog();
      }
    }


  }

}
