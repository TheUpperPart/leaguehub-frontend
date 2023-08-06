import MakeGameContext from '@contexts/MakeGameContext';
import { ChangeEvent, ChangeEventHandler, MouseEventHandler, useState } from 'react';

interface MakeGameProps {
  children: React.ReactNode;
}

export interface BasicInfo {
  title: string;
  participationNum: number;
  channelImageUrl: string;
}

export interface IsUseCustomRule {
  tier: boolean;
  playCount: boolean;
}

export interface CustomRule {
  tierMax: string;
  tierMin: string;
  gradeMax: string;
  playCountMin: number;
}

const MakeGameProvider = ({ children }: MakeGameProps) => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const [category, setCategory] = useState<number>(1);

  const [matchFormat, setMatchFormat] = useState<number>(0);

  const [basicInfo, setBasicInfo] = useState<BasicInfo>({
    title: '',
    participationNum: 0,
    channelImageUrl: '',
  });

  const [isUseCustomRule, setIsUseCustomRule] = useState<IsUseCustomRule>({
    tier: false,
    playCount: false,
  });

  const [customRule, setCustomRule] = useState<CustomRule>({
    tierMax: '100',
    tierMin: 'asd',
    gradeMax: 'asd',
    playCountMin: 100,
  });

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

  const handleCustomRule = (type: keyof CustomRule, e: ChangeEvent<HTMLInputElement>) => {
    setCustomRule({ ...customRule, [type]: e.target.value });
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
  };

  return <MakeGameContext.Provider value={contextValue}>{children}</MakeGameContext.Provider>;
};

export default MakeGameProvider;
