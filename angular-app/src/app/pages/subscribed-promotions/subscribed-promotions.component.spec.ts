import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribedPromotionsComponent } from './subscribed-promotions.component';

describe('SubscribedPromotionsComponent', () => {
  let component: SubscribedPromotionsComponent;
  let fixture: ComponentFixture<SubscribedPromotionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscribedPromotionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscribedPromotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
