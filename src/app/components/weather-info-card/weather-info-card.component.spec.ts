import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherInfoCardComponent } from './weather-info-card.component';

describe('WeatherInfoCardComponent', () => {
  let component: WeatherInfoCardComponent;
  let fixture: ComponentFixture<WeatherInfoCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherInfoCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
