import { Component, OnInit } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/compat/firestore";
import { MatDialog } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { user } from "../models/user";
import { UsersService } from "../services/users.service";

@Component({
  selector: "app-profil",
  templateUrl: "./profil.component.html",
  styleUrls: ["./profil.component.scss"],
})
export class ProfilComponent implements OnInit {
  users_list?: user[];
  get_id?: string = "";
  username?: string = undefined;
  email = "";
  evfolyam = "";
  name = "";
  szak = "";
  private usertableCollection?: AngularFirestoreCollection<any>;
  tableIDs?: Observable<any[]>;
  displayTable = false;

  constructor(
    private users: UsersService,
    public dialog: MatDialog,
    private readonly afs: AngularFirestore
  ) {
    this.usertableCollection = afs.collection<any>("user-table");
    this.tableIDs = this.usertableCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const id = a.payload.doc.id;
          return id;
        })
      )
    );
  }

  ngOnInit(): void {
    this.users
      .listUsers()
      ?.pipe(take(1))
      .subscribe((user_id) => {
        this.users_list = user_id;
        this.get_id = sessionStorage.getItem("id") as string;
        this.users_list.map((item) => {
          if (item.id == this.get_id) {
            this.username = item.username;
            this.email = item.email;
            this.evfolyam = item.evfolyam;
            this.name = item.name.firstname + " " + item.name.lastname;
            this.szak = item.szak;
          }
        });
      });

    this.tableIDs?.pipe(take(1)).subscribe((ids) => {
      ids.forEach((id) => {
        if (id === this.get_id) {
          this.displayTable = true;
          return;
        }
      });
    });
  }

  tableAppear(display: boolean) {
    this.displayTable = display;
  }
}
