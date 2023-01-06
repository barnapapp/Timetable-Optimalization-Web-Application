import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogtmpComponent } from './dialogtmp.component';

describe('DialogtmpComponent', () => {
  let component: DialogtmpComponent;
  let fixture: ComponentFixture<DialogtmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogtmpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogtmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
