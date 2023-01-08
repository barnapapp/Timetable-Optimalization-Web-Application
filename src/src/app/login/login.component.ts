import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from '../services/auth.service';
import { SharedService } from '../services/shared.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    public chekker = false;
    public loginGroup: FormGroup;
    private readonly element?: HTMLElement;

    constructor(
        private readonly authService: AuthService,
        private readonly toast: HotToastService,
        private readonly router: Router,
        private readonly shared: SharedService
    ) {
        this.loginGroup = new FormGroup({
            loginPassword: new FormControl('', [Validators.required]),
            loginEmail: new FormControl('', [
                Validators.required,
                Validators.email
            ])
        });
    }

    get loginPassword() {
        return this.loginGroup.get('loginPassword');
    }

    get loginEmail() {
        return this.loginGroup.get('loginEmail');
    }

    public login(): void {
        this.authService
            .login(this.loginEmail?.value, this.loginPassword?.value)
            .then((cred) => {
                this.toast.success('Sikeres bejelentkezés');
                this.loginGroup.reset();
                this.chekker = true;
                const id = cred.user?.uid.toString();
                sessionStorage.setItem('id', id!);
                this.shared.sendId();
                this.router.navigateByUrl('/myHome');
            })
            .catch(() => {
                this.chekker = false;
                this.toast.error('Sikertelen bejelentkezés :( ');
            });
    }

    public ngOnDestroy(): void {
        this.element?.classList.remove('mat-tab-body-wrapper');
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
