import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedTableComponent } from './saved-table.component';

describe('SavedTableComponent', () => {
    let component: SavedTableComponent;
    let fixture: ComponentFixture<SavedTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SavedTableComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SavedTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
