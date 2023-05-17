import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = `${environment.API_URL}/users`;
  constructor(
    private http: HttpClient
  ) { }

  create(dto: string) {
    return this.http.post<string>(this.apiUrl, dto);
  }

  getAll() {
    return this.http.get<string[]>(this.apiUrl);
  }
}
