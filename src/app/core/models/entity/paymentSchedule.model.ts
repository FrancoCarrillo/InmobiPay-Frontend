export interface PaymentSchedule {
  id: number;
  gracePeriod: string;
  initialBalance: number;
  amortization: number;
  interest: number;
  lien_insurance: number;
  allRiskInsurance: number;
  commission: number;
  fee: number;
}
