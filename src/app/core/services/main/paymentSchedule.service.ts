import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { LoanForm } from '../../models/entity/loanForm.model';
import { Reschedule } from 'src/app/pages/main/simulator/simulator.component';

@Injectable({
  providedIn: 'root',
})
export class PaymenScheduleService {
  constructor(private http: HttpClient) { }

  postCreditInformation(simulatorForm: LoanForm) {
    return this.http.post<any>(`${environment.API_URL}/credit/schedule`, simulatorForm);
  }

  postRescheduleInformation(simulatorForm: Reschedule) {
    return this.http.post<any>(`${environment.API_URL}/credit/reschedule`, simulatorForm);
  }


}
