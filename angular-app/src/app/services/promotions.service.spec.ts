import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PromotionsService } from './promotions.service';
import { Promotion } from '../models/promotion.model';
import { environment } from '../../environments/environments';

describe('PromotionsService', () => {
  let service: PromotionsService;
  let httpMock: HttpTestingController;

  const mockApiUrl = 'https://api.example.com/promotions';
  const mockPromotions: Promotion[] = [
    { id: '1', title: 'Promo 1', category: 'Test', active: true, startDate: new Date().toDateString(), endDate: new Date().toDateString(), optedIn: false },
    { id: '2', title: 'Promo 2', category: 'Test', active: true, startDate: new Date().toDateString(), endDate: new Date().toDateString(), optedIn: false },
  ];
  const mockPromotion: Promotion = { id: '1', title: 'Promo 1', category: 'Test', active: true, startDate: new Date().toDateString(), endDate: new Date().toDateString(), optedIn: true };

  beforeEach(() => {
    // Mock environment.API_URL
    spyOnProperty(environment, 'API_URL', 'get').and.returnValue(mockApiUrl);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PromotionsService],
    });

    service = TestBed.inject(PromotionsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get promotions from API', () => {
    service.getPromotions().subscribe(promotions => {
      expect(promotions).toEqual(mockPromotions);
    });

    const req = httpMock.expectOne(mockApiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockPromotions);
  });

  it('should update opt-in status for a promotion', () => {
    service.updateOptIn(mockPromotion).subscribe(updatedPromo => {
      expect(updatedPromo).toEqual(mockPromotion);
    });

    const req = httpMock.expectOne(`${mockApiUrl}/${mockPromotion.id}`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ optedIn: mockPromotion.optedIn });
    req.flush(mockPromotion);
  });
});