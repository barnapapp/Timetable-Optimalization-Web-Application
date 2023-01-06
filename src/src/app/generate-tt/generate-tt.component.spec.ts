import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateTtComponent } from './generate-tt.component';

describe('GenerateTtComponent', () => {
  let component: GenerateTtComponent;
  let fixture: ComponentFixture<GenerateTtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateTtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateTtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
