import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class InterestService {
  constructor(private http: HttpClient) {}

  getInterests() {
    return this.http.get<any>(`${environment.API_URL}/interest`);
  }

}
