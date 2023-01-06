import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { SUPPORTED_LANGUAGES } from '../languages';
import { user } from '../models/user';
import { SharedService } from '../services/shared.service';
import { UsersService } from '../services/users.service';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  get_id?: string = "";
  username?: string = undefined;
  users_list?: user[];
  eventIdSubscription?: Subscription;
  admin_uid: string = "bG1q22qquqaK0hHZe31oDmX4yYg1";
  seeadmin: boolean = false;
  public languages = SUPPORTED_LANGUAGES;
  @ViewChild("selectedLang") selectedLang?: MatSelect;

  constructor(private get_bool: SharedService,
              private users: UsersService,
              public translate: TranslateService) { 

                this.eventIdSubscription = get_bool.getId().subscribe(() => {
                    this.ngOnInit();                  
                })

              }


  ngOnInit(): void {
   // this.username = undefined;
    this.users.listUsers()?.pipe(take(1)).subscribe((user_id) => {
      this.users_list = user_id;
        this.get_id = sessionStorage.getItem('id') as string;
        this.users_list.map((item) => {
          if(item.id == this.get_id) {
            this.username = item.username;
          }
        })
    })

    if(sessionStorage.getItem("id") == this.admin_uid) {
      this.seeadmin = true;
    } else {
      this.seeadmin = false;
    }


  }

  double_chekker() {
    sessionStorage.removeItem('id');
    this.username = undefined;
    this.seeadmin = false;
  }

  public switchLanguage(language: string): void {
    this.translate.use(language);
  }

  public translateSelectLanguage(language: string): string {
    const languageCode = language.replace(/[\r\n]/g, "").toUpperCase();
    return "LANGUAGE.SETTINGS.LANG." + languageCode;
  }

}
