import { IMealSumup, ISlot } from '..';

export interface ISchedule {
  id?: string;
  days: IDay[];
}

export interface IDay {
  id?: string;
  timestamp: number;
  config: IDayConfig[];
}

export interface IDayConfig {
  slot: ISlot;
  meal?: IMealSumup;
}

export interface ITile {
  config: IDayConfig;
  cols: number;
  rows: number;
  color?: string;
}
