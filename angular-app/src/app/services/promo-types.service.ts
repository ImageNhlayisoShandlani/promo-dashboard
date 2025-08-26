import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class PromoTypesService {

  private apiURL = environment.API_URL;
  constructor(private http: HttpClient) { }

  getCategories(): Observable<string[]> {
    return this.http.get<any[]>(this.apiURL).pipe(
      map(promos => Array.from(new Set(promos.map(p => p.category))))
    );
  }
}
