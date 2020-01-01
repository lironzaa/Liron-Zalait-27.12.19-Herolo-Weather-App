import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherFavoriteInfoCardComponent } from './weather-favorite-info-card.component';

describe('WeatherFavoriteInfoCardComponent', () => {
  let component: WeatherFavoriteInfoCardComponent;
  let fixture: ComponentFixture<WeatherFavoriteInfoCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherFavoriteInfoCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherFavoriteInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
