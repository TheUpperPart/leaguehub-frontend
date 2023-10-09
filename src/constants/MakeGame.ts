import { BasicInfo, CustomRule, IsUseCustomRule } from '@components/providers/MakeGameProvider';

export enum MakeChannelStep {
  'MakeOrJoin',
  'SelectGame',
  'SettingRule',
  'JoinGame',
}

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
  initCategory: number;
  initMatchFormat: number;
  initBasicInfo: BasicInfo;
  initIsUseCustomRule: IsUseCustomRule;
  initCustomRule: CustomRule;
  initChannelImgUrl: string;
}

export const TFTInitialValue: TFTInitial = {
  initCategory: -1,
  initMatchFormat: 0,
  initBasicInfo: {
    title: '',
    participationNum: 0,
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
  initChannelImgUrl: '',
};
