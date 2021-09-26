import { SafeUrl } from '@angular/platform-browser';

export interface ISlot {
  id: number;
  name: string;
}

export interface IMealSumup {
  id: string;
  name: string;
  description: string;
  imageThumb: SafeUrl;
  slots: ISlot[];
  attributes: string[];
}

export const slotsList: {
  breakfast: ISlot;
  snack1: ISlot;
  lunch: ISlot;
  snack2: ISlot;
  dinner: ISlot;
} = {
  breakfast: { id: 1, name: 'BREAKFAST' },
  snack1: { id: 2, name: 'SNACK1' },
  lunch: { id: 3, name: 'LUNCH' },
  snack2: { id: 4, name: 'SNACK2' },
  dinner: { id: 5, name: 'DINNER' }
};
