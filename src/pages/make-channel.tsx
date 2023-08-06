import { useContext, useState } from 'react';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import SelectGame from '@components/MakeChannel/SelectGame';
import Button from '@components/Button/index';
import useMakeGame from '@hooks/useMakeGame';

export interface RuleSetting {
  category: number;
  matchFormat: number;
  title: string;
  participationNum: number;
  tier: boolean;
  tierMax: number;
  tierMin: number;
  gradeMax: string;
  channelImageUrl: string;
  playCount: boolean;
  playCountMin: number;
}

const MakeChannel = () => {
  const { currentStep, handleCurrentStep } = useMakeGame();

  return (
    <Container>
      <Wrapper>{currentStep === 0 && <SelectGame />}</Wrapper>
      {currentStep !== 0 && (
        <StepBtnContainer>
          <Button width={25} height={7} borderRadius={1} onClick={handleCurrentStep}>
            다음
          </Button>
        </StepBtnContainer>
      )}
    </Container>
  );
};

export default MakeChannel;

export const fadeIn = keyframes`
    0% {
        opacity: 0;
        transform: translateY(10px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
`;

const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 5.5rem);
  position: relative;
`;

const Wrapper = styled.div`
  padding: 5rem;
  transition: 0.3s ease;
`;

const StepBtnContainer = styled.div`
  position: absolute;
  bottom: 5rem;
  right: 5rem;
`;
