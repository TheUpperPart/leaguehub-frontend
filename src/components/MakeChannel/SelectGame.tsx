import Button from '@components/Button';
import Icon from '@components/Icon';
import { GameEnum, MakeChannelStep } from '@constants/MakeGame';
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import useMakeGame from '@hooks/useMakeGame';

interface Props {
  handleCurrentModalStep: (step: keyof typeof MakeChannelStep) => void;
  handleModal: () => void;
}

const SelectGame = ({ handleCurrentModalStep, handleModal }: Props) => {
  const { handleSelectGameCategory } = useMakeGame();

  const handleSelectGame = (category: keyof typeof GameEnum) => {
    handleSelectGameCategory(GameEnum[category]);
    handleCurrentModalStep('SettingRule');
  };

  return (
    <Container>
      <ModalTitle>
        <div
          css={css`
            display: flex;
            flex-direction: row;
            align-items: center;
          `}
        >
          <div
            css={css`
              padding-top: 0.3rem;
              &: hover {
                cursor: pointer;
              }
            `}
          >
            <Icon kind='goBack' size='2rem' onClick={() => handleCurrentModalStep('MakeOrJoin')} />
          </div>
          <div
            css={css`
              color: #b3b3b3;
              padding-left: 1rem;
            `}
          >
            채널 추가하기
          </div>
        </div>
        <ExitButton onClick={() => handleModal()}>x</ExitButton>
      </ModalTitle>
      <Wrapper>
        <Title>개최 종목을 선택해주세요</Title>
        <GameContainer>
          <GameBtn onClick={() => handleSelectGame('TFT')}>전략적 팀 전투</GameBtn>
          <GameBtn onClick={() => handleSelectGame('LOL')}>리그오브레전드</GameBtn>
          <GameBtn onClick={() => handleSelectGame('HSS')}>하스스톤</GameBtn>
          <GameBtn onClick={() => handleSelectGame('FIFA')}>피파</GameBtn>
        </GameContainer>
      </Wrapper>
    </Container>
  );
};

export default SelectGame;

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
  min-height: inherit;
  display: flex;
  flex-direction: column;

  animation: ${fadeIn} 1s ease;
`;

const ModalTitle = styled.h1`
  display: flex;
  justify-content: space-between;
  font-size: 2rem;
  height: 4rem;
`;

const Wrapper = styled.div``;

const Title = styled.h1`
  text-align: center;
  font-size: 3rem;
  margin: 3rem 0;
`;

const GameContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  column-gap: 2rem;
  justify-content: center;

  row-gap: 2rem;
`;

const GameBtn = styled.button`
  background-color: #353535;
  width: 23rem;
  height: 8rem;
  border-radius: 1rem;
  color: #f9fafb;
  border: none;
  font-size: 3rem;
  cursor: pointer;
`;

const ExitButton = styled.div`
  color: #444444;
  display: flex;
  flex-direction: row;

  &: hover {
    cursor: pointer;
  }
`;
