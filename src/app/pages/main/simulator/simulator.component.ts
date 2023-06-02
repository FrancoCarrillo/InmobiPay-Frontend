import { Router } from '@angular/router';

import { PaymenScheduleService } from './../../../core/services/main/paymentSchedule.service';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { LoanForm } from 'src/app/core/models/entity/loanForm.model';
import { PersonalForm } from '../personal/personal.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PaymentSchedule } from 'src/app/core/models/entity/paymentSchedule.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';



@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.scss']
})



export class SimulatorComponent implements OnInit, AfterViewInit {

  @Input() loanFormData: LoanForm = {} as LoanForm;
  @Input() personalData: PersonalForm = {} as PersonalForm;

  @Output() goBack = new EventEmitter<void>();

  goBackToPreviousStep() {
    this.goBack.emit();
  }

  van: number = 0;
  tir: number = 0;
  creditResponses: PaymentSchedule[] = [];

  ngOnInit(): void {
    console.log(this.loanFormData);
    console.log(this.personalData);
  }

  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;
    dataSource: MatTableDataSource<PaymentSchedule> = new MatTableDataSource();
    displayedColumns: string[] = ['id','tea', 'tem' , 'gracePeriod','initialBalance', 'amortization', 'interest', 'lien_insurance', 'allRiskInsurance', 'commission', 'fee'];

    constructor(private paymenScheduleService: PaymenScheduleService, private authService: AuthService, private router: Router) { }

    ngAfterViewInit() {
        this.postCreditInformation();
    }

    postCreditInformation() {
      this.paymenScheduleService.postCreditInformation({
        rate: 10.5,
        amountPayments: 300,
        propertyValue: 464200,
        loanAmount: 150000,
        lienInsurance: 1.001,
        allRiskInsurance: 1.001,
        isPhysicalShipping: true,
        interestRateType: "effective",
        isGoodPayerBonus: true,
        isGreenBonus: true,
        cokRate: 1.001
      } as LoanForm).subscribe((res) => {
        this.van = res.van;
        this.tir = res.tir;
        this.creditResponses = res.creditResponses;
        this.dataSource = new MatTableDataSource(res.creditResponses);
        this.dataSource.paginator = this.paginator;
      });
    }

    logout(): void {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
}
