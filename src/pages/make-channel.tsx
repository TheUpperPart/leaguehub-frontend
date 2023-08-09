import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import SelectGame from '@components/MakeChannel/SelectGame';
import SelectRule from '@components/MakeChannel/SelectRule';
import Button from '@components/Button/index';
import useMakeGame from '@hooks/useMakeGame';
import authAPI from '@apis/authAPI';
import { useRouter } from 'next/router';

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
  const router = useRouter();

  const { currentStep, handleCurrentStep, resetState } = useMakeGame();

  const fetchMakeGame = async () => {
    try {
      const res = await authAPI({
        method: 'post',
        url: '/api/channel',
      });

      if (res.status === 200) {
        resetState();
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Wrapper>
        {currentStep === 0 && <SelectGame />}
        {currentStep === 1 && <SelectRule />}
      </Wrapper>
      <StepBtnContainer>
        {currentStep === 0 ? (
          <Button width={25} height={7} borderRadius={1} onClick={handleCurrentStep}>
            다음
          </Button>
        ) : (
          <Button width={25} height={7} borderRadius={1} onClick={fetchMakeGame}>
            생성하기
          </Button>
        )}
      </StepBtnContainer>
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
