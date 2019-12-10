import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OsChartComponent } from './os-chart.component';

describe('OsChartComponent', () => {
  let component: OsChartComponent;
  let fixture: ComponentFixture<OsChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OsChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
