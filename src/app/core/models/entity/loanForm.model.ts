
export interface LoanForm {
  rate:               number;
  amountPayments:     number;
  propertyValue:      number;
  loanAmount:         number;
  lienInsurance:      number;
  allRiskInsurance:   number;
  administrativeExpenses: number;
  postage: number;
  commissions: number;
  currencyName: number;
  interestRateType:   string;
  isGoodPayerBonus:   boolean;
  isGreenBonus:       boolean;
  cokRate:            number;
}
