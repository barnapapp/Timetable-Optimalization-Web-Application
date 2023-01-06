import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { HotToastService } from "@ngneat/hot-toast";
import { user } from "../models/user";
import { AuthService } from "../services/auth.service";
import { SharedService } from "../services/shared.service";
import { UsersService } from "../services/users.service";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"],
  // encapsulation: ViewEncapsulation.None,
})
export class SignUpComponent implements OnInit {
  //registerGroup!: FormGroup;
  element?: HTMLElement;
  chekker: boolean = false;

  private checkPasswords: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let pass = group.get("registrationPassword")?.value;
    let confirmPass = group.get("registrationConfirmPassword")?.value;

    return pass === confirmPass ? null : { notSame: true };
  };

  //this.registerGroup = this.fb.group({
  registerGroup = new FormGroup(
    {
      registrationConfirmPassword: new FormControl("", [Validators.required]),
      registrationPassword: new FormControl("", [
        Validators.required,
        Validators.minLength(4)
      ]),
      registrationEmail: new FormControl("", [
        Validators.required,
        Validators.email,
      ]),
      registrationFirstName: new FormControl("", Validators.required),
      registrationLastName: new FormControl("", Validators.required),
    },
    { validators: this.checkPasswords }
  );

  loginGroup = new FormGroup({
    loginPassword: new FormControl("", [
      Validators.required,
    ]),
    loginEmail: new FormControl("", [Validators.required, Validators.email]),
  });

  register() {
    if (
      this.registrationConfirmPassword?.value !=
      this.registrationPassword?.value
    ) {
      this.toast.error("A jelszavak nem egyeznek");
      return;
    }

    this.authService
      .signUp(this.registrationEmail?.value, this.registrationPassword?.value)
      .then((user) => {
        const impl_user: user = {
          id: user.user?.uid as string,
          email: this.registrationEmail?.value,
          username: this.registrationEmail?.value.split("@")[0],
          szak: "",
          evfolyam: "",
          name: {
            firstname: this.registrationFirstName?.value,
            lastname: this.registrationLastName?.value,
          },
          map: {},
        };
        this.user_serv.create(impl_user).then((_) => {
          console.log("Sikeresen hozzaadtad a felhasználót!!");
        });
        this.toast.success("Sikeres regisztráció.");
        this.registerGroup.reset();
        this.router.navigateByUrl("/myHome");
      })
      .catch((_) => {
        this.toast.error("Sikertelen regisztráció :( ");
      });
  }

  login() {
    this.authService
      .login(this.loginEmail?.value, this.loginPassword?.value)
      .then((cred) => {
        this.toast.success("Sikeres bejelentkezés.");
        this.loginGroup.reset();
        this.chekker = true;
        //console.log(cred.user?.uid.toString());
        let id = cred.user?.uid.toString();
        sessionStorage.setItem("id", id!);
        this.shared.sendId();
        this.ngOnInit(); // nem kell
        this.router.navigateByUrl("/myHome");
      })
      .catch(() => {
        this.chekker = false;
        this.ngOnInit(); // nem kell
        this.toast.error("Sikertelen bejelentkezés :( ");
      });
  }

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private toast: HotToastService,
    private router: Router,
    private shared: SharedService,
    private user_serv: UsersService
  ) {}

  ngOnInit(): void {} //?

  ngOnDestroy(): void {
    this.element?.classList.remove("mat-tab-body-wrapper");
  }

  get loginPassword() {
    return this.loginGroup.get("loginPassword");
  }

  get loginEmail() {
    return this.loginGroup.get("loginEmail");
  }

  get registrationEmail() {
    return this.registerGroup.get("registrationEmail");
  }

  get registrationPassword() {
    return this.registerGroup.get("registrationPassword");
  }

  get registrationConfirmPassword() {
    return this.registerGroup.get("registrationConfirmPassword");
  }

  get registrationFirstName() {
    return this.registerGroup.get("registrationFirstName");
  }

  get registrationLastName() {
    return this.registerGroup.get("registrationLastName");
  }
}
