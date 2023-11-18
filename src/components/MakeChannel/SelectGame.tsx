import Icon from '@components/Icon';
import { GameEnum, MakeChannelStep } from '@constants/MakeGame';
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import useMakeGame from '@hooks/useMakeGame';
import { gameImageLink } from '@constants/GameImageLink';

interface Props {
  handleCurrentModalStep: (step: keyof typeof MakeChannelStep) => void;
  handleModal: () => void;
}

interface ButtonProps {
  backgroundImg: string;
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
          <ImageWrapper>
            <GameBtn backgroundImg={gameImageLink.TFT} onClick={() => handleSelectGame('TFT')} />
            <GameName>전략적 팀 전투</GameName>
          </ImageWrapper>
          <ImageWrapper>
            <GameBtn backgroundImg={gameImageLink.LOL} onClick={() => handleSelectGame('LOL')} />
            <GameName>리그오브레전드</GameName>
          </ImageWrapper>
          <ImageWrapper>
            <GameBtn backgroundImg={gameImageLink.HS} onClick={() => handleSelectGame('HSS')} />
            <GameName>하스스톤</GameName>
          </ImageWrapper>
          <ImageWrapper>
            <GameBtn backgroundImg={gameImageLink.FIFA} onClick={() => handleSelectGame('FIFA')} />
            <GameName>피파</GameName>
          </ImageWrapper>
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

const GameBtn = styled.button<ButtonProps>`
  ${(props) => `background-image: url(${props.backgroundImg});`}
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  width: 23rem;
  height: 23rem;
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

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;

  &: hover {
    transform: scale(1.1);
    transition: 0.3s;
  }
`;

const GameName = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;
