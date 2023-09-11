import { keyframes } from '@emotion/react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { useEffect } from 'react';

import SelectGame from '@components/MakeChannel/SelectGame';
import SelectRule from '@components/MakeChannel/SelectRule';
import { ChannelCircleProps } from '@type/channelCircle';
import Button from '@components/Button/index';
import useMakeGame from '@hooks/useMakeGame';
import useChannels from '@hooks/useChannels';
import authAPI from '@apis/authAPI';

const MakeChannel = () => {
  const router = useRouter();

  const {
    currentStep,
    gameCategory,
    matchFormat,
    basicInfo,
    isUseCustomRule,
    customRule,
    resetState,
    isHaveBlankValue,
    channelImgUrl,
  } = useMakeGame();

  const { addChannel } = useChannels();

  const fetchMakeGame = async () => {
    if (isHaveBlankValue()) {
      alert('빈 값이 있어요. 확인부탁드립니다');
      return;
    }

    try {
      const res = await authAPI<ChannelCircleProps>({
        method: 'post',
        url: '/api/channel',
        data: {
          gameCategory,
          matchFormat,
          title: basicInfo.title,
          maxPlayer: basicInfo.participationNum,
          tier: isUseCustomRule.tierMax || isUseCustomRule.tierMin,
          tierMax: customRule.tierMax,
          tierMin: customRule.tierMin,
          playCount: isUseCustomRule.playCount,
          playCountMin: customRule.playCountMin,
          channelImageUrl: channelImgUrl,
        },
      });
      resetState();
      router.push('/');
      addChannel(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentStep === 1) {
      if (!confirm('이전에 작성하시던 정보가 있습니다. 이어서 작성하시겠습니까?')) {
        resetState();
      }
    }
  }, []);

  return (
    <Container>
      <Wrapper>
        {currentStep === 0 && <SelectGame />}
        {currentStep === 1 && <SelectRule />}
      </Wrapper>
      <StepBtnContainer>
        {currentStep === 1 && (
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
