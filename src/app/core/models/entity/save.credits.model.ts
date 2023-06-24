
import { CurrencyModel } from './currency.model';
import { InterestType } from "./interestType.model";

export interface SaveCreditInformation {
  name:                   string;
  rate:                   number;
  amountPayments:         number;
  propertyValue:          number;
  loanAmount:             number;
  lienInsurance:          number;
  allRiskInsurance:       number;
  administrativeExpenses: number;
  postage:                number;
  commissions:            number;
  interestRateType:       string;
  isGoodPayerBonus:       boolean;
  isGreenBonus:           boolean;
  cokRate:                number;
  currencyName:           string;
  userId:                 number;
}
export interface GetCreditInformation {
  id:                     number;
  name:                   string;
  rate:                   number;
  amountPayments:         number;
  propertyValue:          number;
  loanAmount:             number;
  lienInsurance:          number;
  allRiskInsurance:       number;
  administrativeExpenses: number;
  postage:                number;
  commissions:            number;
  interestRate:           InterestType;
  isGoodPayerBonus:       boolean;
  isGreenBonus:           boolean;
  cokRate:                number;
  currency:               CurrencyModel;
}

export interface SaveCreditPayload {
  name: string;
  rate: number;
  amountPayments: number;
  propertyValue: number;
  loanAmount: number;
  lienInsurance: number;
  allRiskInsurance: number;
  administrativeExpenses: number;
  postage: number;
  commissions: number;
  interestRateType: string;
  isGoodPayerBonus: boolean;
  isGreenBonus: boolean;
  cokRate: number;
  currencyName: string;
  userId?: number;
}
