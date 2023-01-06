import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToAdminComponent } from './to-admin.component';

describe('ToAdminComponent', () => {
  let component: ToAdminComponent;
  let fixture: ComponentFixture<ToAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
