import { TFTInitialValue } from '@constants/MakeGame';
import MakeGameContext from '@contexts/MakeGameContext';
import { ChangeEvent, useState } from 'react';

interface MakeGameProps {
  children: React.ReactNode;
}

export interface BasicInfo {
  title: string;
  participationNum: number;
  channelImageUrl: string;
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
  } = TFTInitialValue;

  const [currentStep, setCurrentStep] = useState<number>(initCurrentStep);

  const [category, setCategory] = useState<number>(initCategory);

  const [matchFormat, setMatchFormat] = useState<number>(initMatchFormat);

  const [basicInfo, setBasicInfo] = useState<BasicInfo>(initBasicInfo);

  const [isUseCustomRule, setIsUseCustomRule] = useState<IsUseCustomRule>(initIsUseCustomRule);

  const [customRule, setCustomRule] = useState<CustomRule>(initCustomRule);

  const handleCurrentStep = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleSelectCategory = (category: number) => {
    setCategory(category);
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

  const resetState = () => {
    setCurrentStep(initCurrentStep);
    setCategory(initCategory);
    setMatchFormat(initMatchFormat);
    setBasicInfo(initBasicInfo);
    setIsUseCustomRule(initIsUseCustomRule);
    setCustomRule(initCustomRule);
  };

  const contextValue = {
    currentStep,
    handleCurrentStep,
    category,
    handleSelectCategory,
    basicInfo,
    handleBasicInfo,
    matchFormat,
    handleMatchFormat,
    isUseCustomRule,
    handleIsUseCustomRule,
    customRule,
    handleCustomRule,
    resetState,
  };

  return <MakeGameContext.Provider value={contextValue}>{children}</MakeGameContext.Provider>;
};

export default MakeGameProvider;
