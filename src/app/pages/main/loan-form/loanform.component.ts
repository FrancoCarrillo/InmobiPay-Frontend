import { CurrencyService } from './../../../core/services/main/currency.service';
import { InterestService } from './../../../core/services/main/interest.service';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { PersonalForm } from '../personal/personal.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CurrencyModel } from 'src/app/core/models/entity/currency.model';
import { InterestType } from 'src/app/core/models/entity/interestType.model';
import { LoanForm } from 'src/app/core/models/entity/loanForm.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Router } from '@angular/router';
import { PaymenScheduleService } from 'src/app/core/services/main/paymentSchedule.service';
import { PaymentSchedule } from 'src/app/core/models/entity/paymentSchedule.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
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

  isLoading = false;

  loanForm: FormGroup = new FormGroup({
    rate: new FormControl<number>({ value: 0, disabled: false }, [
      Validators.required,
    ]),
    amountPayments: new FormControl<number>({ value: 0, disabled: false }, [
      Validators.required,
    ]),
    propertyValue: new FormControl<number>({ value: 0, disabled: false }, [
      Validators.required,
    ]),
    loanAmount: new FormControl<number>({ value: 0, disabled: false }, [
      Validators.required,
    ]),
    lienInsurance: new FormControl<number>({ value: 0, disabled: false }, [
      Validators.required,
    ]),
    allRiskInsurance: new FormControl<number>({ value: 0, disabled: false }, [
      Validators.required,
    ]),
    administrativeExpenses: new FormControl<number>(
      { value: 0, disabled: false },
      [Validators.required]
    ),
    postage: new FormControl<number>({ value: 0, disabled: false }, [
      Validators.required,
    ]),
    commissions: new FormControl<number>({ value: 0, disabled: false }, [
      Validators.required,
    ]),

    interestRateType: new FormControl<string>({ value: '', disabled: false }, [
      Validators.required,
    ]),
    currencyName: new FormControl<string>({ value: '', disabled: false }, [
      Validators.required,
    ]),
    bank: new FormControl<number>(
      { value: this.personalData.bank, disabled: false },
      [Validators.required]
    ),
    isGoodPayerBonus: new FormControl<boolean>(
      { value: false, disabled: false },
      [Validators.required]
    ),
    isGreenBonus: new FormControl<boolean>({ value: false, disabled: false }, [
      Validators.required,
    ]),
    cokRate: new FormControl<number>({ value: 0, disabled: false }, [
      Validators.required,
    ]),
  });

  loanFormData: LoanForm = {} as LoanForm;
  van: number = 0;
  tir: number = 0;
  creditResponses: PaymentSchedule[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;
  dataSource: MatTableDataSource<PaymentSchedule> = new MatTableDataSource();

  constructor(
    private interestService: InterestService,
    private currencyService: CurrencyService,
    private authService: AuthService,
    private router: Router,
    private paymenScheduleService: PaymenScheduleService,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {}
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
      console.error('Invalid form fields:', this.loanForm.controls);
      return;
    }
    this.loanFormData = this.loanForm.value;
    this.postCreditInformation(this.loanFormData).subscribe(
      (res) => {
        this.van = res.van;
        this.tir = res.tir;
        this.creditResponses = res.creditResponses;
        this.dataSource = new MatTableDataSource(res.creditResponses);
        this.dataSource.paginator = this.paginator;
        this.loanFormComplete.emit(this.loanForm.value);
        this.isLoading = false;
      },
      (error) => {
        console.error(error);
        this.isLoading = false;
        this.snackBar.open(error.error.message, 'Close', {
          duration: 5000,
          verticalPosition: 'top',
        });
      }
    );
  }
  postCreditInformation(simulatorForm: LoanForm): Observable<any> {
    return this.paymenScheduleService.postCreditInformation(simulatorForm);
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
