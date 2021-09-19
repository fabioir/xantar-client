import { SafeUrl } from '@angular/platform-browser';

export enum SlotEnum {
  BREAKFAST,
  SNACK,
  LUNCH,
  DINNER
}

export interface IMealSumup {
  id: string;
  name: string;
  description: string;
  imageThumb: SafeUrl;
  slots: SlotEnum[];
  attributes: string[];
}
