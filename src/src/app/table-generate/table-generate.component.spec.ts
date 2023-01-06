import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableGenerateComponent } from './table-generate.component';

describe('TableGenerateComponent', () => {
  let component: TableGenerateComponent;
  let fixture: ComponentFixture<TableGenerateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableGenerateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
