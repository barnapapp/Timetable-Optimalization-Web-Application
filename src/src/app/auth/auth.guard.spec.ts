import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
    let authGuard: AuthGuard;
    let authService: AuthService;
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        authGuard = TestBed.inject(AuthGuard);
        authService = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
        router = jasmine.createSpyObj('Router', ['navigate']);
        authGuard = new AuthGuard(authService, router);
    });

    it('should be created', () => {
        expect(authGuard).toBeTruthy();
    });

    it('should call the isAuthenticated method of the authService', () => {
        spyOn(authService, 'isAuthenticated');
        authGuard.canActivate();
        expect(authService.isAuthenticated).toHaveBeenCalled();
    });

    it('should return true if the user is authenticated', () => {
        spyOn(authService, 'isAuthenticated').and.returnValue(true);
        expect(authGuard.canActivate()).toBe(true);
    });

    it('should navigate to the home page and return false if the user is not authenticated', () => {
        spyOn(authService, 'isAuthenticated').and.returnValue(false);
        spyOn(router, 'navigate');

        expect(authGuard.canActivate()).toBe(false);
        expect(router.navigate).toHaveBeenCalledWith(['']);
    });

    it('should navigate to the home route and return false if the auth service throws an error', () => {
        spyOn(authService, 'isAuthenticated').and.throwError('Error');

        expect(authGuard.canActivate()).toBe(false);
        expect(router.navigate).toHaveBeenCalledWith(['']);
    });
});
