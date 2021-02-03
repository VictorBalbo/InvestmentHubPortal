import { InvestmentType } from '../models/InvestmentType';
import { PatrimonyEvolution } from '../models/PatrymonyEvolution';
import { Summary } from '../models/Summary';

export class ApiService {
  /**
   * Get the evolution of patrimony for the client on backend.
   * For now, this only returns mocked values.
   */
  static async getPatrimonyEvolution(): Promise<PatrimonyEvolution[]> {
    return [
      { Date: '2020-10-01T00:00:00', Value: 2480 },
      { Date: '2020-10-02T00:00:00', Value: 2481 },
      { Date: '2020-10-03T00:00:00', Value: 2493 },
      { Date: '2020-10-04T00:00:00', Value: 2495 },
      { Date: '2020-10-05T00:00:00', Value: 2550 },
      { Date: '2020-10-06T00:00:00', Value: 2500 },
    ];
  }

  /**
   * Get the summary for client on backend.
   * For now, this only returns mocked values.
   */
  static async getSummaryAsync(): Promise<Summary> {
    return {
      TotalValue: 3500,
      TotalInvestedValue: 3000,
      MonthGain: 200,
      Investments: [
        {
          ProviderName: 'Rico',
          InvestmentName: 'XPML11',
          Value: 1000,
          Cost: 900,
          Type: InvestmentType.STOCK,
          Alocation: 0.286,
          InvestedAlocation: 0.333,
          GeneratesIncome: true,
        },
        {
          ProviderName: 'Rico',
          InvestmentName: 'RBVA11',
          Value: 2000,
          Cost: 1900,
          Type: InvestmentType.STOCK,
          Alocation: 0.571,
          InvestedAlocation: 0.667,
          GeneratesIncome: true,
        },
        {
          ProviderName: 'Rico',
          InvestmentName: 'BALANCE',
          Value: 500,
          Cost: 500,
          Type: InvestmentType.BALANCE,
          Alocation: 0.143,
          InvestedAlocation: 0,
          GeneratesIncome: false,
        },
      ],
    };
  }

  /**
   * Get the summary for client on backend.
   * For now, this only returns mocked values.
   */
  static async getWalletSummaryAsync(): Promise<Summary> {
    return {
      TotalValue: 3500,
      TotalInvestedValue: 3000,
      MonthGain: 200,
      Investments: [
        {
          ProviderName: 'Rico',
          InvestmentName: 'XPML11',
          Value: 1000,
          Cost: 900,
          Type: InvestmentType.STOCK,
          Alocation: 0.286,
          InvestedAlocation: 0.333,
          GeneratesIncome: true,
        },
        {
          ProviderName: 'Rico',
          InvestmentName: 'RBVA11',
          Value: 2000,
          Cost: 1900,
          Type: InvestmentType.STOCK,
          Alocation: 0.571,
          InvestedAlocation: 0.667,
          GeneratesIncome: true,
        },
        {
          ProviderName: 'Rico',
          InvestmentName: 'BALANCE',
          Value: 500,
          Cost: 500,
          Type: InvestmentType.BALANCE,
          Alocation: 0.143,
          InvestedAlocation: 0,
          GeneratesIncome: false,
        },
      ],
    };
  }
}
