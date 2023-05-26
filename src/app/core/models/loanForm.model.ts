
export interface LoanForm {
  rate:               number;
  amountPayments:     number;
  propertyValue:      number;
  loanAmount:         number;
  lienInsurance:      number;
  allRiskInsurance:   number;
  isPhysicalShipping: boolean;
  interestRateType:   string;
  isGoodPayerBonus:   boolean;
  isGreenBonus:       boolean;
  cokRate:            number;
}
