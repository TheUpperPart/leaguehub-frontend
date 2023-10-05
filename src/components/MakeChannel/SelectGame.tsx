import Button from '@components/Button';
import { GameEnum, MakeChannelStep } from '@constants/MakeGame';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import useMakeGame from '@hooks/useMakeGame';

interface Props {
  handleCurrentModalStep: (step: keyof typeof MakeChannelStep) => void;
}

const SelectGame = ({ handleCurrentModalStep }: Props) => {
  const { handleSelectGameCategory } = useMakeGame();

  const handleSelectGame = (category: keyof typeof GameEnum) => {
    handleSelectGameCategory(GameEnum[category]);
    handleCurrentModalStep('SettingRule');
  };

  return (
    <Container>
      <Wrapper>
        <Title>개최하실 게임을 선택해주세요.</Title>
        <GameContainer>
          <GameBtn onClick={() => handleSelectGame('TFT')}>TFT</GameBtn>
          <GameBtn onClick={() => handleSelectGame('LOL')}>L.O.L</GameBtn>
          <GameBtn onClick={() => handleSelectGame('HSS')}>하스스톤</GameBtn>
          <GameBtn onClick={() => handleSelectGame('FIFA')}>FIFA</GameBtn>
        </GameContainer>
        <BtnContainer>
          <Button width={20} height={5} onClick={() => handleCurrentModalStep('MakeOrJoin')}>
            뒤로 가기
          </Button>
        </BtnContainer>
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
  align-items: center;
  justify-content: center;

  animation: ${fadeIn} 1s ease;
`;

const Wrapper = styled.div``;

const Title = styled.h1`
  text-align: center;
  font-size: 3rem;
  margin: 3rem 0;
`;

const GameContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 2rem;
  justify-content: center;
  flex-direction: column;

  row-gap: 2rem;
`;

const GameBtn = styled.button`
  background-color: #202b37;
  width: 100%;
  height: 8rem;
  border-radius: 1rem;
  color: #f9fafb;
  border: none;
  font-size: 3rem;
  cursor: pointer;
`;

const BtnContainer = styled.div`
  margin-top: 2rem;
`;
