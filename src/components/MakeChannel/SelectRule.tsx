import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import Button from '@components/Button/index';
import ToggleButton from '@components/Button/Toggle/index';

import useMakeGame from '@hooks/useMakeGame';
import { GameMethod } from '@constants/MakeGame';
import CustomRule from './CustomRule';

const SelectRule = () => {
  const {
    matchFormat,
    handleMatchFormat,
    basicInfo,
    handleBasicInfo,
    isUseCustomRule,
    handleIsUseCustomRule,
    customRule,
    handleCustomRule,
  } = useMakeGame();

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
            <RuleInfo>*입력한 참여자 수의 75%가 참여해야 대회를 시작할 수 있습니다.</RuleInfo>
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
            {isUseCustomRule.tierMin && <CustomRule state='tierMax' />}
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
  margin: 3rem 0;
`;
const RuleTitle = styled.h2`
  font-size: 3rem;
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
`;

const BtnContainer = styled.div`
  display: flex;
`;

const RuleInput = styled.input`
  width: 40rem;
  height: 6rem;
  margin: 0;
  border: 0.1rem solid black;
  border-radius: 1rem;
  font-size: 2rem;
  padding: 1rem;
`;

const RuleInfo = styled.span`
  font-size: 1.8rem;
`;

const RuleBtn = styled(Button)<{ isSelected: boolean }>`
  background-color: ${(prop) => (prop.isSelected ? 'black' : 'gray')};
`;

const CustomTitle = styled.h3`
  font-size: 2rem;
`;
