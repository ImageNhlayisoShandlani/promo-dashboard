import { TestBed } from '@angular/core/testing';

import { PromoTypesService } from './promo-types.service';

describe('PromoTypesService', () => {
  let service: PromoTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromoTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
