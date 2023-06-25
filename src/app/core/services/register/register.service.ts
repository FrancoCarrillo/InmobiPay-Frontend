import { RegisterDto } from './../../models/dto/RegisterDto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  register_f(User: RegisterDto): Observable<RegisterDto> {
    return this.http.post<RegisterDto>(`${environment.API_URL}/api/user/auth/register`, RegisterDto)
  }
}
