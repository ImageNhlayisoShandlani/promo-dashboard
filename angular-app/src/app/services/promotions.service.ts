import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Promotion } from '../models/promotion.model';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class PromotionsService {
  private apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {
   }

    getPromotions(): Observable<Promotion[]>{
      return this.http.get<Promotion[]>(this.apiUrl);
    }

    updateOptIn(promo: Promotion): Observable<Promotion> {
    return this.http.patch<Promotion>(`${this.apiUrl}/${promo.id}`, { optedIn: promo.optedIn });
  }
}
