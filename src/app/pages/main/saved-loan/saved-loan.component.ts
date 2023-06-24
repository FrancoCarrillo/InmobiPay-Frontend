import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { GetCreditInformation } from 'src/app/core/models/entity/save.credits.model';
import { SaveCreditsService } from 'src/app/core/services/main/savecredits.service';
import { PersonalForm } from '../personal/personal.component';
import { LoanForm } from 'src/app/core/models/entity/loanForm.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';



@Component({
  selector: 'app-saved-loan',
  templateUrl: './saved-loan.component.html',
  styleUrls: ['./saved-loan.component.scss']
})



export class SavedLoanComponent implements OnInit {
  id: string | null = '';
  isLoading: boolean = false;
  savedCredits: BehaviorSubject<GetCreditInformation[]> = new BehaviorSubject<GetCreditInformation[]>([]);
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  hasData: boolean = false;
  constructor(private saveCreditsService: SaveCreditsService,private router: Router, private snackBar: MatSnackBar,private cdr: ChangeDetectorRef,) {

  }

  ngOnInit(): void {
    this.id = localStorage.getItem('id');
    this.getCreditInformation();
  }

  getCreditInformation() {
    this.isLoading$.next(true);
    this.saveCreditsService.getCreditInformation(this.id).subscribe((data) => {
      this.savedCredits.next(data);
      this.isLoading$.next(false);
    }, error => {
      this.isLoading$.next(false);
    });
  }

  deleteSavedCredit(id: number) {
    this.isLoading$.next(true);
    this.saveCreditsService.deleteCreditInformation(id).subscribe(() => {
      this.getCreditInformation();
      this.snackBar.open('Crédito eliminado con éxito', '', { duration: 2000 });
    },
      error => {
        this.snackBar.open('Error al eliminar el crédito', '', { duration: 2000 });
        this.isLoading$.next(false);
      });
  }




  personalData: PersonalForm = {} as PersonalForm;
  loanForm: LoanForm = {} as LoanForm;

  mapToLoanForm(savedCredits: GetCreditInformation): LoanForm {
    return {
      rate: savedCredits.rate,
      amountPayments: savedCredits.amountPayments,
      propertyValue: savedCredits.propertyValue,
      loanAmount: savedCredits.loanAmount,
      lienInsurance: savedCredits.lienInsurance,
      allRiskInsurance: savedCredits.allRiskInsurance,
      administrativeExpenses: savedCredits.administrativeExpenses,
      postage: savedCredits.postage,
      commissions: savedCredits.commissions,
      currencyName: savedCredits.currency.id,
      interestRateType: savedCredits.interestRate.type,
      isGoodPayerBonus: savedCredits.isGoodPayerBonus,
      isGreenBonus: savedCredits.isGreenBonus,
      cokRate: savedCredits.cokRate,
      finalBalance: 0
    }
  }


  goBackToPreviousStep() {
    this.router.navigate(['/simulator']);
  }



}
