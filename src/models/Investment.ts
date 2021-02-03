import { InvestmentType } from './InvestmentType';

export interface Investment {
  /**
   * Name of the provider
   */
  ProviderName: string;

  /**
   * Name of the investment
   */
  InvestmentName: string;

  /**
   * Value in the investment
   */
  Value: number;

  /**
   * Cost of the investment
   */
  Cost: number;

  /**
   * Type of the investment
   */
  Type: InvestmentType;

  /**
   * Percentage of the investment over the total
   */
  Alocation: number;

  /**
   * Percentage of the investment over the total that generates income
   */
  InvestedAlocation: number;

  /**
   * Is this investment profitable (does it generate passive income)
   */
  GeneratesIncome: boolean;
}
