import {
  IDay,
  IDayConfig,
  ISchedule,
  ITile,
  slotsList
} from '@xantar/domain/models';
import { mockMeal } from '../../meals/components/meals-list/meals-list.mock';

export const mockDayConfig: IDayConfig = {
  slot: slotsList.breakfast,
  meal: mockMeal
};

export const mockDay: IDay = {
  id: 'mock-day-id',
  timestamp: 1633207107387,
  configurations: [
    { ...mockDayConfig, slot: slotsList.breakfast },
    { ...mockDayConfig, slot: slotsList.snack1 },
    { ...mockDayConfig, slot: slotsList.lunch },
    { ...mockDayConfig, slot: slotsList.snack2 },
    { ...mockDayConfig, slot: slotsList.dinner }
  ]
};

export const mockSchedule: ISchedule = {
  id: 'mock-schedule-id',
  days: [mockDay, mockDay, mockDay, mockDay, mockDay, mockDay, mockDay]
};

export const mockTile: ITile = {
  config: {
    slot: slotsList.breakfast,
    meal: mockMeal
  },
  cols: 1,
  rows: 1,
  color: '#000000'
};
