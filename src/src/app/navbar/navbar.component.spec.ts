import { InjectionToken } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { SharedService } from '../services/shared.service';
import { UsersService } from '../services/users.service';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
    let component: NavbarComponent;
    let usersService: UsersService;
    let sharedService: SharedService;
    let translateService: TranslateService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: AngularFirestore, useValue: {} },
                { provide: InjectionToken, useValue: {} }
            ]
        });
        usersService = jasmine.createSpyObj('UsersService', ['listUsers']);
        sharedService = jasmine.createSpyObj('SharedService', ['getId']);
        translateService = jasmine.createSpyObj('TranslateService', ['use']);
        component = new NavbarComponent(
            sharedService,
            usersService,
            translateService
        );
    });

    it('should set the username based on the user ID', () => {
        const listUsersMock = () => of([{ id: '123', username: 'testuser' }]);
        const getIdMock = () => of('some value');

        sharedService.getId = getIdMock;
        spyOn(sharedService, 'getId').and.callThrough();
        usersService.listUsers = listUsersMock;
        spyOn(usersService, 'listUsers').and.callThrough();

        sessionStorage.setItem('id', '123');

        component.ngOnInit();

        expect(sharedService.getId).toHaveBeenCalled();
        expect(usersService.listUsers).toHaveBeenCalled();
        expect(component.username).toEqual('testuser');
    });

    it('should remove the user ID from session storage and set the username to undefined', () => {
        sessionStorage.setItem('id', '123');
        component.username = 'testuser';
        component.double_chekker();
        expect(sessionStorage.getItem('id')).toEqual(null);
        expect(component.username).toBeUndefined();
    });

    it('should set seeadmin to true if the user ID is the admin ID', () => {
        sessionStorage.setItem('id', 'bG1q22qquqaK0hHZe31oDmX4yYg1');
        component.ngOnInit();
        expect(component.seeadmin).toEqual(true);
    });

    it('should set seeadmin to false if the user ID is not the admin ID', () => {
        sessionStorage.setItem('id', '123');
        component.ngOnInit();
        expect(component.seeadmin).toEqual(false);
    });

    it('should set the language when switchLanguage is called', () => {
        component.switchLanguage('en');
        expect(translateService.use).toHaveBeenCalledWith('en');
    });

    it('should translate the language code when translateSelectLanguage is called', () => {
        expect(component.translateSelectLanguage('en')).toEqual(
            'LANGUAGE.SETTINGS.LANG.EN'
        );
    });

    it('should return the correct translation string for English', () => {
        const language = 'EN';
        const expected = 'LANGUAGE.SETTINGS.LANG.EN';
        const result = component.translateSelectLanguage(language);
        expect(result).toEqual(expected);
    });

    it('should return the correct translation string for Hungarian', () => {
        const language = 'HU';
        const expected = 'LANGUAGE.SETTINGS.LANG.HU';
        const result = component.translateSelectLanguage(language);
        expect(result).toEqual(expected);
    });
});
