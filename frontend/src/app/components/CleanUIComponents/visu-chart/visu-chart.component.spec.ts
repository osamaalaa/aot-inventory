import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisuChartComponent } from './visu-chart.component';

describe('VisuChartComponent', () => {
  let component: VisuChartComponent;
  let fixture: ComponentFixture<VisuChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisuChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisuChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
