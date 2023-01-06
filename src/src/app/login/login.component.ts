import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HotToastService } from "@ngneat/hot-toast";
import { AuthService } from "../services/auth.service";
import { SharedService } from "../services/shared.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  element?: HTMLElement;
  chekker: boolean = false;

  loginGroup = new FormGroup({
    loginPassword: new FormControl("", [
      Validators.required,
    ]),
    loginEmail: new FormControl("", [Validators.required, Validators.email]),
  });

  login() {
    this.authService
      .login(this.loginEmail?.value, this.loginPassword?.value)
      .then((cred) => {
        this.toast.success("Sikeres bejelentkezés");
        this.loginGroup.reset();
        this.chekker = true;
        let id = cred.user?.uid.toString();
        sessionStorage.setItem("id", id!);
        this.shared.sendId();
        // this.ngOnInit(); // wut?
        this.router.navigateByUrl("/myHome");
      })
      .catch(() => {
        this.chekker = false;
        // this.ngOnInit(); // wut?
        this.toast.error("Sikertelen bejelentkezés :( ");
      });
  }

  constructor(
    private authService: AuthService,
    private toast: HotToastService,
    private router: Router,
    private shared: SharedService
  ) {}

  ngOnDestroy(): void {
    this.element?.classList.remove("mat-tab-body-wrapper");
  }

  get loginPassword() {
    return this.loginGroup.get("loginPassword");
  }

  get loginEmail() {
    return this.loginGroup.get("loginEmail");
  }

  //   onTabChanged(event: MatTabChangeEvent): void {
  //     switch (event.index) {
  //       case 0:
  //         this.router.navigate(["myLogin"]);
  //         break;
  //       case 1:
  //         this.router.navigate(["mySignUp"]);
  //         break;
  //     }
  //   }
}