import { BasicInfo, CustomRule, IsUseCustomRule } from '@components/providers/MakeGameProvider';
import { ChangeEvent, createContext } from 'react';

interface MakeGameState {
  gameCategory: number;
  handleSelectGameCategory: (category: number) => void;
  basicInfo: BasicInfo;
  handleBasicInfo: (type: keyof BasicInfo, e: ChangeEvent<HTMLInputElement>) => void;
  matchFormat: number;
  handleMatchFormat: (type: number) => void;
  isUseCustomRule: IsUseCustomRule;
  handleIsUseCustomRule: (type: keyof IsUseCustomRule) => void;
  customRule: CustomRule;
  handleCustomRule: (type: keyof CustomRule, value: number) => void;
  resetState: () => void;
  isHaveBlankValue: () => boolean;
  channelImgUrl: string;
  handleImgUrl: (url: string) => void;
}

const MakeGameContext = createContext<MakeGameState | null>(null);

export default MakeGameContext;
