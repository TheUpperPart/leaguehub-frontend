import { ChangeEvent, useState } from 'react';

import { TFTInitialValue } from '@constants/MakeGame';
import MakeGameContext from '@contexts/MakeGameContext';

interface MakeGameProps {
  children: React.ReactNode;
}

export interface BasicInfo {
  title: string;
  participationNum: number;
}

export interface IsUseCustomRule {
  tierMax: boolean;
  tierMin: boolean;
  playCount: boolean;
}

export interface CustomRule {
  tierMax: number;
  tierMin: number;
  playCountMin: number;
}

const MakeGameProvider = ({ children }: MakeGameProps) => {
  const {
    initCurrentStep,
    initCategory,
    initMatchFormat,
    initBasicInfo,
    initIsUseCustomRule,
    initCustomRule,
    initChannelImgUrl,
  } = TFTInitialValue;

  const [currentStep, setCurrentStep] = useState<number>(initCurrentStep);
  const [gameCategory, setGameCategory] = useState<number>(initCategory);
  const [matchFormat, setMatchFormat] = useState<number>(initMatchFormat);
  const [basicInfo, setBasicInfo] = useState<BasicInfo>(initBasicInfo);
  const [isUseCustomRule, setIsUseCustomRule] = useState<IsUseCustomRule>(initIsUseCustomRule);
  const [customRule, setCustomRule] = useState<CustomRule>(initCustomRule);
  const [channelImgUrl, setChannelImgUrl] = useState<string>('');
  const handleCurrentStep = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleSelectGameCategory = (category: number) => {
    setGameCategory(category);
    handleCurrentStep();
  };

  const handleMatchFormat = (type: number) => {
    setMatchFormat(type);
  };

  const handleBasicInfo = (type: keyof BasicInfo, e: ChangeEvent<HTMLInputElement>) => {
    setBasicInfo({ ...basicInfo, [type]: e.target.value });
  };

  const handleIsUseCustomRule = (type: keyof IsUseCustomRule) => {
    setIsUseCustomRule((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const handleCustomRule = (type: keyof CustomRule, value: number) => {
    if (isNaN(Number(value))) {
      return alert('숫자만 입력하세요!');
    }
    setCustomRule({ ...customRule, [type]: value });
  };

  const handleImgUrl = (url: string) => {
    setChannelImgUrl(url);
  };

  const resetState = () => {
    setCurrentStep(initCurrentStep);
    setGameCategory(initCategory);
    setMatchFormat(initMatchFormat);
    setBasicInfo(initBasicInfo);
    setIsUseCustomRule(initIsUseCustomRule);
    setCustomRule(initCustomRule);
    setChannelImgUrl(initChannelImgUrl);
  };

  const isHaveBlankValue = () => {
    if (
      gameCategory < 0 ||
      matchFormat < 0 ||
      basicInfo.title.length === 0 ||
      basicInfo.participationNum <= 0
    ) {
      return true;
    }
    return false;
  };

  const contextValue = {
    currentStep,
    handleCurrentStep,
    gameCategory,
    handleSelectGameCategory,
    basicInfo,
    handleBasicInfo,
    matchFormat,
    handleMatchFormat,
    isUseCustomRule,
    handleIsUseCustomRule,
    customRule,
    handleCustomRule,
    resetState,
    isHaveBlankValue,
    channelImgUrl,
    handleImgUrl,
  };

  return <MakeGameContext.Provider value={contextValue}>{children}</MakeGameContext.Provider>;
};

export default MakeGameProvider;
