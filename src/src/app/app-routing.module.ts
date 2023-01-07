import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';
import { GenerateTtComponent } from './generate-tt/generate-tt.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfilComponent } from './profil/profil.component';
import { SevicesInputsComponent } from './sevices-inputs/sevices-inputs.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ToAdminComponent } from './to-admin/to-admin.component';

const routes: Routes = [
    {
        path: 'myCreate',
        component: SevicesInputsComponent,
        canActivate: [AuthGuard]
    },
    { path: 'mySignUp', component: SignUpComponent },
    { path: 'myLogin', component: LoginComponent },
    { path: 'myAdmin', component: ToAdminComponent, canActivate: [AuthGuard] },
    { path: 'myHome', component: HomeComponent },
    {
        path: 'generate',
        component: GenerateTtComponent,
        canActivate: [AuthGuard]
    },
    { path: 'myProfil', component: ProfilComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: 'myHome', pathMatch: 'full' },
    { path: '**', component: AppComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
