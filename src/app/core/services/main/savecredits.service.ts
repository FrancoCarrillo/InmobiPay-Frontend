import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { LoanForm } from '../../models/entity/loanForm.model';
import { Reschedule } from 'src/app/pages/main/simulator/simulator.component';
import { SaveCreditInformation, SaveCreditPayload } from '../../models/entity/save.credits.model';

@Injectable({
  providedIn: 'root',
})
export class SaveCreditsService {
  constructor(private http: HttpClient) { }

  saveCreditInformation(payload: SaveCreditPayload) {
    return this.http.post<any>(`${environment.API_URL}/credit/save`, payload);
}


  getCreditInformation(id: string | null) {
    return this.http.get<any>(`${environment.API_URL}/credit/${id}`);
  }

  deleteCreditInformation(id: number) {
    return this.http.delete<any>(`${environment.API_URL}/credit/${id}`);
  }


}
