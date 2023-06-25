import { Router } from '@angular/router';

import { PaymenScheduleService } from './../../../core/services/main/paymentSchedule.service';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { LoanForm } from 'src/app/core/models/entity/loanForm.model';
import { PersonalForm } from '../personal/personal.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PaymentSchedule } from 'src/app/core/models/entity/paymentSchedule.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
interface TableRow {
  id: number;
  tea: number;
  tem: number;
  gracePeriod: string;
  initialBalance: number;
  amortization: number;
  interest: number;
  lien_insurance: number;
  allRiskInsurance: number;
  administrativeExpenses: number;
  postage: number;
  commission: number;
  fee: number;
  finalBalance: number;
}

export interface GraceAndRatesRequest {
  tea: number;
  gracePeriod: string;
}
export interface Reschedule {
  graceAndRatesRequests: GraceAndRatesRequest[];
  amountPayments: number;
  propertyValue: number;
  loanAmount: number;
  lienInsurance: number;
  allRiskInsurance: number;
  administrativeExpenses: number;
  postage: number;
  commissions: number;
  isGoodPayerBonus: boolean;
  isGreenBonus: boolean;
  cokRate: number;
}


@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.scss']
})



export class SimulatorComponent implements OnInit, AfterViewInit {

  @Input() loanFormData: LoanForm = {} as LoanForm;
  @Input() personalData: PersonalForm = {} as PersonalForm;

  tableData: TableRow[] = [];


  @Output() goBack = new EventEmitter<void>();

  goBackToPreviousStep() {
    this.goBack.emit();
  }

  van: number = 0;
  tir: number = 0;
  creditResponses: PaymentSchedule[] = [];

  ngOnInit(): void {
    console.warn(this.loanFormData);
    console.log(this.personalData);

  }

  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;
  dataSource: MatTableDataSource<PaymentSchedule> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'tea', 'tem', 'gracePeriod', 'initialBalance', 'amortization', 'interest', 'lien_insurance', 'allRiskInsurance', 'commission', 'administrativeExpenses', 'postage', 'fee', 'finalBalance'];

  constructor(private snackBar: MatSnackBar,private paymenScheduleService: PaymenScheduleService, private authService: AuthService, private router: Router) { }

  ngAfterViewInit() {
    this.postCreditInformation();
  }

  postCreditInformation() {
    this.paymenScheduleService.postCreditInformation(this.loanFormData as LoanForm).subscribe((res) => {
      this.van = res.van;
      this.tir = res.tir;
      this.creditResponses = res.creditResponses;
      this.dataSource = new MatTableDataSource(res.creditResponses);
      this.dataSource.paginator = this.paginator;
      this.tableData = res.creditResponses.map((row: TableRow, index: number) => ({
        id: index + 1,
        tea: row.tea,
        administrativeExpenses: row.administrativeExpenses,
        postage: row.postage,
        finalBalance: row.finalBalance,
        tem: row.tem,
        gracePeriod: row.gracePeriod,
        initialBalance: row.initialBalance,
        amortization: row.amortization,
        interest: row.interest,
        lien_insurance: row.lien_insurance,
        allRiskInsurance: row.allRiskInsurance,
        commission: row.commission,
        fee: row.fee
      }));

    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  calculate(): void {
    const graceAndRatesRequests: GraceAndRatesRequest[] = this.tableData.map((row: TableRow) => ({
      tea: row.tea,
      gracePeriod: row.gracePeriod
    }));
    const reschedule: Reschedule = {
      graceAndRatesRequests: graceAndRatesRequests,
      amountPayments: this.loanFormData.amountPayments,
      propertyValue: this.loanFormData.propertyValue,
      loanAmount: this.loanFormData.loanAmount,
      lienInsurance: this.loanFormData.lienInsurance,
      allRiskInsurance: this.loanFormData.allRiskInsurance,
      administrativeExpenses: this.loanFormData.administrativeExpenses,
      postage: this.loanFormData.postage,
      commissions: this.loanFormData.commissions,
      isGoodPayerBonus: this.loanFormData.isGoodPayerBonus,
      isGreenBonus: this.loanFormData.isGreenBonus,
      cokRate: this.loanFormData.cokRate
    };
    //console.log(reschedule);

    this.paymenScheduleService.postRescheduleInformation(reschedule).subscribe((res) => {
      this.van = res.van;
      this.tir = res.tir;
      this.creditResponses = res.creditResponses;
      this.dataSource = new MatTableDataSource(res.creditResponses);
      this.dataSource.paginator = this.paginator;
      this.tableData = res.creditResponses.map((row: TableRow, index: number) => ({
        id: index + 1,
        tea: row.tea,
        tem: row.tem,
        gracePeriod: row.gracePeriod,
        initialBalance: row.initialBalance,
        amortization: row.amortization,
        interest: row.interest,
        lien_insurance: row.lien_insurance,
        allRiskInsurance: row.allRiskInsurance,
        commission: row.commission,
        administrativeExpenses: row.administrativeExpenses,
        postage: row.postage,
        finalBalance: row.finalBalance,
        fee: row.fee
      }));
    }, (error) => {
      this.snackBar.open(error.error.message, 'Close', {
        duration: 5000,
        verticalPosition: 'top',
      },);
    });
  }


  onTeaChange(event: any, id: number) {
    const newValue = event.target.value;
    const index = this.tableData.findIndex(row => row.id === id);
    if (index >= 0) {
      this.tableData[index].tea = +newValue;
    }
  }

  onGracePeriodChange(event: any, id: number) {
    const newValue = event.value;
    const index = this.tableData.findIndex(row => row.id === id);
    if (index >= 0) {
      this.tableData[index].gracePeriod = newValue;
    }
  }


  save(): void {


  }
}
