import { BasicInfo, CustomRule, IsUseCustomRule } from '@components/providers/MakeGameProvider';

export enum GameEnum {
  'TFT',
  'LOL',
  'HSS',
  'FIFA',
}

export enum GameMethod {
  'Free-For-All',
  'Single-Elimination',
}

interface TFTInitial {
  initCurrentStep: number;
  initCategory: number;
  initMatchFormat: number;
  initBasicInfo: BasicInfo;
  initIsUseCustomRule: IsUseCustomRule;
  initCustomRule: CustomRule;
}

export const TFTInitialValue: TFTInitial = {
  initCurrentStep: 0,
  initCategory: -1,
  initMatchFormat: -1,
  initBasicInfo: {
    title: '',
    participationNum: 0,
    channelImageUrl: '',
  },
  initIsUseCustomRule: {
    tierMax: false,
    tierMin: false,
    playCount: false,
  },
  initCustomRule: {
    tierMax: 400,
    tierMin: 0,
    playCountMin: 50,
  },
};