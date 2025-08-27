import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PromoCardComponent } from './promo-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SubscriptionsService } from '../../services/subscriptions.service';
import { Router } from '@angular/router';
import { Promotion } from '../../models/promotion.model';
import { By } from '@angular/platform-browser';

// Mock Router
class MockRouter {
  url = '/';
}

// Mock SubscriptionsService
const mockSubscriptionsService = jasmine.createSpyObj('SubscriptionsService', ['']);

describe('PromoCardComponent', () => {
  let component: PromoCardComponent;
  let fixture: ComponentFixture<PromoCardComponent>;

  const samplePromo: Promotion = {
    id: '1',
    title: 'Test Promo',
    category: 'Test Category',
    active: true,
    startDate: '2025-01-01',
    endDate: '2025-12-31',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatSlideToggleModule,
        FormsModule,
        PromoCardComponent,
      ],
      providers: [
        { provide: SubscriptionsService, useValue: mockSubscriptionsService },
        { provide: Router, useValue: new MockRouter() },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PromoCardComponent);
    component = fixture.componentInstance;
    component.promo = samplePromo;
    fixture.detectChanges();
  });

  describe('Template Rendering', () => {
    it('should display inactive status with correct class', () => {
      component.promo = { ...samplePromo, active: false };
      fixture.detectChanges();
      const statusElement = fixture.debugElement.query(By.css('strong')).nativeElement;
      expect(statusElement.textContent).toContain('No');
      expect(statusElement.classList).toContain('inactive');
    });

    it('should display start and end dates', () => {
      const contentElement = fixture.debugElement.query(By.css('mat-card-content')).nativeElement;
      expect(contentElement.textContent).toContain('Start: Jan 1, 2025');
      expect(contentElement.textContent).toContain('End: Dec 31, 2025');
    });

    it('should display "Subcribe Now!" when isChecked is false', () => {
      component.isChecked = false;
      fixture.detectChanges();
      const toggle = fixture.debugElement.query(By.css('mat-slide-toggle')).nativeElement;
      expect(toggle.textContent).toContain('Subcribe Now!');
    });

    it('should display active status with correct class', () => {
      const statusElement = fixture.debugElement.query(By.css('strong')).nativeElement;
      expect(statusElement.textContent).toContain('Yes');
      expect(statusElement.classList).toContain('active');
    });

    it('should display promo title and category', () => {
      const titleElement = fixture.debugElement.query(By.css('mat-card-title')).nativeElement;
      const subtitleElement = fixture.debugElement.query(By.css('mat-card-subtitle')).nativeElement;
      expect(titleElement.textContent).toContain(samplePromo.title);
      expect(subtitleElement.textContent).toContain(samplePromo.category);
    });
  });
});