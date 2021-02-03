import { Investment } from './Investment';

export interface Summary {
  TotalValue: number;
  TotalInvestedValue: number;
  MonthGain: number;
  Investments: Investment[];
}
