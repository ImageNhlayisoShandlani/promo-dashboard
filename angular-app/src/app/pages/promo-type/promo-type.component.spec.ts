import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoTypeComponent } from './promo-type.component';

describe('PromoTypeComponent', () => {
  let component: PromoTypeComponent;
  let fixture: ComponentFixture<PromoTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromoTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromoTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
