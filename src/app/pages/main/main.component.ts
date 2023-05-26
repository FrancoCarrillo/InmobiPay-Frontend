import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
})



export class MainComponent {

  currentStep = 'personal';
  personalData: any;
  loanFormData: any;

  constructor(){

  }


  onPersonalDataComplete(data: any) {
    this.personalData = data;
    this.currentStep = 'loanForm';
  }



  onLoanFormComplete(formData: any) {
    this.loanFormData = formData;
    this.currentStep = 'simulator';
  }

  onGoBackPersonal() {
    this.currentStep = 'personal';
  }

  onGoBackLoan() {
    this.currentStep = 'loanForm';
  }


}
