import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromoTypesService {

  private apiURL = 'http://localhost:3000/promotions';
  constructor(private http: HttpClient) { }

  getCategories(): Observable<string[]> {
    return this.http.get<any[]>(this.apiURL).pipe(
      // map unique categories only
      map(promos => Array.from(new Set(promos.map(p => p.category))))
    );
  }
}
