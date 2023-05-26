
import { CurrencyService } from './../../../core/services/main/currency.service';
import { InterestService } from './../../../core/services/main/interest.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PersonalForm } from '../personal/personal.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CurrencyModel } from 'src/app/core/models/currency.model';
import { InterestType } from 'src/app/core/models/interestType.model';
import { LoanForm } from 'src/app/core/models/loanForm.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-loan-form',
  templateUrl: './loanform.component.html',
})

export class LoanFormComponent implements OnInit {
  @Input() personalData: PersonalForm = {} as PersonalForm;
  @Output() loanFormComplete = new EventEmitter<LoanForm>();
  @Output() goBack = new EventEmitter<void>();

  moneyOptions: CurrencyModel[] = [];
  interestOptions: InterestType[] = [];

  loanForm: FormGroup = new FormGroup({
    rate: new FormControl<number>(
      { value: 0, disabled: false },
      [Validators.required]
    ),
    amountPayments: new FormControl<number>(
      { value: 0, disabled: false },
      [Validators.required]
    ),
    propertyValue: new FormControl<number>(
      { value: 0, disabled: false },
      [Validators.required]
    ),
    loanAmount: new FormControl<number>(
      { value: 0, disabled: false },
      [Validators.required]
    ),
    lienInsurance: new FormControl<number>(
      { value: 0, disabled: false },
      [Validators.required]
    ),
    allRiskInsurance: new FormControl<number>(
      { value: 0, disabled: false },
      [Validators.required]
    ),
    isPhysicalShipping: new FormControl<boolean>(
      { value: false, disabled: false },
      [Validators.required]
    ),
    isTotal: new FormControl<boolean>(
      { value: false, disabled: false },
      [Validators.required]
    ),
    isPartial: new FormControl<boolean>(
      { value: false, disabled: false },
      [Validators.required]
    ),
    monthlyGracePeriod: new FormControl<number>(
      { value: 0, disabled: false },
      [Validators.required]
    ),
    interestRateType: new FormControl<string>(
      { value: '', disabled: false },
      [Validators.required]
    ),
    currencyName: new FormControl<string>(
      { value: '', disabled: false },
      [Validators.required]
    ),
    bank: new FormControl<string>(
      { value: this.personalData.bank, disabled: false },
      [Validators.required]
    ),
    isGoodPayerBonus: new FormControl<boolean>(
      { value: false, disabled: false },
      [Validators.required]
    ),
    isGreenBonus: new FormControl<boolean>(
      { value: false, disabled: false },
      [Validators.required]
    ),
  });

  constructor(private interestService: InterestService, private currencyService: CurrencyService, private authService: AuthService, private router: Router) { }
  ngOnInit(): void {
    this.interestService.getInterests().subscribe((data) => {
      this.interestOptions = data;
    });
    this.currencyService.getCurrencies().subscribe((data) => {
      this.moneyOptions = data;
    });
  }

  onLoanFormComplete() {
    this.loanForm.get('bank')?.setValue(this.personalData.bank);
    this.loanForm.markAllAsTouched();
    if (this.loanForm.invalid) {
      for (const field in this.loanForm.controls) {
        if (this.loanForm.controls[field].invalid) {
          console.log('Campo inválido:', field);
        }
      }
      return;
    }
    this.loanFormComplete.emit(this.loanForm.value);
  }


  goBackToPreviousStep() {
    this.goBack.emit();
  }


  currentStep = 'personal';

  onPersonalDataComplete() {
    this.currentStep = 'loanForm';
  }

  onClear() {
    this.loanForm.reset();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
