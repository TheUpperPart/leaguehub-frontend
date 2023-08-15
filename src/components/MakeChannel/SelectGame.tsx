import { GameEnum } from '@constants/MakeGame';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import useMakeGame from '@hooks/useMakeGame';

const SelectGame = () => {
  const { handleSelectGameCategory } = useMakeGame();

  return (
    <Container>
      <Wrapper>
        <Title>개최하실 게임을 선택해주세요.</Title>
        <GameContainer>
          <GameBtn onClick={() => handleSelectGameCategory(GameEnum.TFT)}>TFT</GameBtn>
          <GameBtn onClick={() => handleSelectGameCategory(GameEnum.LOL)}>L.O.L</GameBtn>
          <GameBtn onClick={() => handleSelectGameCategory(GameEnum.HSS)}>하스스톤</GameBtn>
          <GameBtn onClick={() => handleSelectGameCategory(GameEnum.FIFA)}>FIFA</GameBtn>
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
  height: calc(100vh - 15.5rem);
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
  margin: 5rem 0;
`;

const GameContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 2rem;
  justify-content: center;
`;

const GameBtn = styled.button`
  background-color: #202b37;
  width: 20rem;
  height: 12.5rem;
  border-radius: 1rem;
  color: #f9fafb;
  border: none;
  font-size: 3rem;
  cursor: pointer;
`;
