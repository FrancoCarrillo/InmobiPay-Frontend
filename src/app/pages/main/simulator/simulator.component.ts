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
import { SaveCreditsService } from 'src/app/core/services/main/savecredits.service';
import { SaveCreditPayload } from 'src/app/core/models/entity/save.credits.model';
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
  @Input() savedLoan: boolean = false;
  @Output() delete = new EventEmitter<number>();
  @Input() creditId: number = 0;


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

  onDelete(): void {
    if (this.creditId) {
      this.delete.emit(this.creditId);
    } else {
      console.error('Error: creditId is undefined');
    }
  }



  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;
  dataSource: MatTableDataSource<PaymentSchedule> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'tea', 'tem', 'gracePeriod', 'initialBalance', 'amortization', 'interest', 'lien_insurance', 'allRiskInsurance', 'commission', 'administrativeExpenses', 'postage', 'fee', 'finalBalance'];

  constructor(private snackBar: MatSnackBar,private paymenScheduleService: PaymenScheduleService, private authService: AuthService, private router: Router, private saveCreditsService: SaveCreditsService) { }

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

    console.log(this.loanFormData);
    console.log(this.personalData);
    const fechaHoy = new Date();
    const fecha = fechaHoy.getFullYear() + '-' + (fechaHoy.getMonth() + 1) + '-' + fechaHoy.getDate();

    const payload: SaveCreditPayload = {
      name: this.personalData.fullName + ' ' + fecha,
      rate: this.loanFormData.rate,
      amountPayments: this.loanFormData.amountPayments,
      propertyValue: this.loanFormData.propertyValue,
      loanAmount: this.loanFormData.loanAmount,
      lienInsurance: this.loanFormData.lienInsurance,
      allRiskInsurance: this.loanFormData.allRiskInsurance,
      administrativeExpenses: this.loanFormData.administrativeExpenses,
      postage: this.loanFormData.postage,
      commissions: this.loanFormData.commissions,
      interestRateType: this.loanFormData.interestRateType,
      isGoodPayerBonus: this.loanFormData.isGoodPayerBonus,
      isGreenBonus: this.loanFormData.isGreenBonus,
      cokRate: this.loanFormData.cokRate,
      //Sies que el currencyName es 1 es sol, si es 2 es dolar si es 3 es euro
      currencyName: this.loanFormData.currencyName == 14 ? "Sol" : "Dolar",
      userId: Number(this.authService.getUserId()),
    };
    //console.log(reschedule);
    this.saveCreditsService.saveCreditInformation(payload).subscribe((data) => {

      this.snackBar.open('Crédito guardado exitosamente!!', 'Cerrar', {
        duration: 2000,
      });
    }, (error) => {
      this.snackBar.open('Ha ocurrido un error: ' + error.message, 'Cerrar', {
        duration: 2000,
      });
    });
  }
}
