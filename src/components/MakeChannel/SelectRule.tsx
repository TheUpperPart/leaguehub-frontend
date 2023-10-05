import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import Button from '@components/Button/index';
import ToggleButton from '@components/Button/Toggle/index';

import useMakeGame from '@hooks/useMakeGame';
import { GameMethod, MakeChannelStep } from '@constants/MakeGame';
import CustomRule from './CustomRule';
import { useRef, useState } from 'react';
import authAPI from '@apis/authAPI';
import Image from 'next/image';
import { ChannelCircleProps } from '@type/channelCircle';
import useChannels from '@hooks/useChannels';
import { useRouter } from 'next/router';

interface Props {
  handleCurrentModalStep: (step: keyof typeof MakeChannelStep) => void;
}

const SelectRule = ({ handleCurrentModalStep }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter();

  const [imageUrl, setImageUrl] = useState<string>();

  const {
    gameCategory,
    matchFormat,
    handleMatchFormat,
    basicInfo,
    handleBasicInfo,
    isUseCustomRule,
    handleIsUseCustomRule,
    customRule,
    handleCustomRule,
    handleImgUrl,
    channelImgUrl,
    resetState,
    isHaveBlankValue,
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

  const fetchUploadChannelImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const formData = new FormData();
    formData.append('uploadImage', e.target.files[0]);

    try {
      const res = await authAPI<{ imgUrl: string }>({
        method: 'post',
        url: `/api/image`,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setImageUrl(res.data.imgUrl);
      handleImgUrl(res.data.imgUrl);
    } catch (error) {}
  };

  return (
    <Container>
      <Wrapper>
        <Rule>
          <RuleTitle>1. 대회 방식</RuleTitle>
          <BtnContainer>
            <RuleBtn
              width={25}
              height={7}
              onClick={() => handleMatchFormat(GameMethod['Free-For-All'])}
              isSelected={matchFormat === GameMethod['Free-For-All']}
            >
              프리포올
            </RuleBtn>
          </BtnContainer>
        </Rule>
        <Rule>
          <RuleTitle>2. 기본 정보</RuleTitle>
          <InputContainer>
            <RuleInput
              placeholder='대회 명'
              value={basicInfo.title}
              onChange={(e) => handleBasicInfo('title', e)}
            />
            <RuleInput
              placeholder='참여자 수 ex) 32'
              type='number'
              value={basicInfo.participationNum === 0 ? '' : basicInfo.participationNum}
              onChange={(e) => handleBasicInfo('participationNum', e)}
            />
            <RuleInfo>*참여자 수의 75%가 참여해야 대회를 시작할 수 있습니다.</RuleInfo>
          </InputContainer>
        </Rule>

        <Rule>
          <RuleTitle>3. 커스텀 룰</RuleTitle>
          <CustomContainer>
            <CustomTitle>최대 티어</CustomTitle>
            <ToggleButton
              isOn={isUseCustomRule.tierMax}
              changeState={() => handleIsUseCustomRule('tierMax')}
            />
            {isUseCustomRule.tierMax && <CustomRule state='tierMax' />}
          </CustomContainer>
          <CustomContainer>
            <CustomTitle>최소 티어</CustomTitle>
            <ToggleButton
              isOn={isUseCustomRule.tierMin}
              changeState={() => handleIsUseCustomRule('tierMin')}
            />
            {isUseCustomRule.tierMin && <CustomRule state='tierMin' />}
          </CustomContainer>
          <CustomContainer>
            <CustomTitle>최소 판수</CustomTitle>
            <ToggleButton
              isOn={isUseCustomRule.playCount}
              changeState={() => handleIsUseCustomRule('playCount')}
            />
            {isUseCustomRule.playCount && (
              <div>
                <input
                  value={customRule.playCountMin}
                  onChange={(e) => handleCustomRule('playCountMin', Number(e.target.value))}
                />
              </div>
            )}
          </CustomContainer>
        </Rule>
        <Rule>
          <RuleTitle>4. 대회 이미지(선택)</RuleTitle>
          <ImageUploadInput
            type='file'
            accept='image/*'
            ref={inputRef}
            onChange={fetchUploadChannelImage}
          />
          {imageUrl && <Image width={50} height={50} src={imageUrl} alt='channelImage' />}
        </Rule>
        <StepBtnContainer>
          <Button width={25} height={7} borderRadius={1} onClick={fetchMakeGame}>
            생성하기
          </Button>
          <Button width={25} height={7} onClick={() => handleCurrentModalStep('SelectGame')}>
            뒤로 가기
          </Button>
        </StepBtnContainer>
      </Wrapper>
    </Container>
  );
};

export default SelectRule;

export const fadeIn = keyframes`
    0% {
        opacity: 0;
        transform: translateX(50px);
    }
    100% {
        opacity: 1;
        transform: translateX(0);
    }
`;

const Container = styled.div`
  animation: ${fadeIn} 1s ease;
`;

const Wrapper = styled.div``;

const Rule = styled.div`
  margin: 2rem 0;
`;
const RuleTitle = styled.h2`
  font-size: 2.4rem;
  text-align: left;
`;

const CustomContainer = styled.div`
  height: 8rem;
  display: grid;
  align-items: center;
  grid-template-columns: 10rem 10rem 1fr;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
  margin: 2rem 0;
`;

const BtnContainer = styled.div`
  display: flex;
`;

const RuleInput = styled.input`
  width: 20rem;
  height: 6rem;
  margin: 0;
  border: 0.1rem solid black;
  border-radius: 1rem;
  font-size: 1.6rem;
  padding: 1rem;
`;

const RuleInfo = styled.span`
  font-size: 1.5rem;
`;

const RuleBtn = styled(Button)<{ isSelected: boolean }>`
  background-color: ${(prop) => (prop.isSelected ? 'black' : 'gray')};
`;

const CustomTitle = styled.h3`
  font-size: 2rem;
`;

const StepBtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  flex-direction: column;
  row-gap: 2rem;
`;

const ImageUploadInput = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;
