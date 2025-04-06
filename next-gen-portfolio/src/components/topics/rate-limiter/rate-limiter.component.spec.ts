import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateLimiterComponent } from './rate-limiter.component';

describe('RateLimiterComponent', () => {
  let component: RateLimiterComponent;
  let fixture: ComponentFixture<RateLimiterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RateLimiterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RateLimiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
