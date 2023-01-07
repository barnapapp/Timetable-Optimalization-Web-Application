import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SevicesInputsComponent } from './sevices-inputs.component';

describe('SevicesInputsComponent', () => {
    let component: SevicesInputsComponent;
    let fixture: ComponentFixture<SevicesInputsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SevicesInputsComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SevicesInputsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
