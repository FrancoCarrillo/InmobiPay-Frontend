import { RegisterDto } from './../../models/dto/RegisterDto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  register(userRequest: RegisterDto): Observable<any> {
    return this.http.post<any>(
      `${environment.API_URL}/api/user/auth/register`,
      userRequest
    );
  }
}
