import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface BoardHeaderProps {
  hostname: string;
  leagueTitle: string;
  game: string;
  participateNum: number;
}

type GameFullName = '리그오브레전드' | '롤토체스' | '피파' | '하스스톤' | '??';

const getGameFullName = (game: string): GameFullName => {
  let gameFullName: GameFullName;
  switch (game) {
    case 'LOL':
      gameFullName = '리그오브레전드';
      break;
    case 'TFT':
      gameFullName = '롤토체스';
      break;
    case 'FIFA':
      gameFullName = '피파';
      break;
    case 'HS':
      gameFullName = '하스스톤';
      break;
    default:
      gameFullName = '??';
  }

  return gameFullName;
};

const BoardHeader = ({ hostname, leagueTitle, game, participateNum }: BoardHeaderProps) => {
  return (
    <Container>
      <Wrapper>
        <span css={labelStyle}>개최자 </span>
        <span css={hostnameStyle}>{hostname}</span>
        <TitleContainer>{leagueTitle}</TitleContainer>
        <GameNameWrapper>{getGameFullName(game)}</GameNameWrapper>
      </Wrapper>
      <div>{participateNum}</div>
    </Container>
  );
};

export default BoardHeader;

const Container = styled.div`
  color: white;
  font-size: 1.3rem;
`;

const Wrapper = styled.div`
  border-bottom: solid 1px #344051;
`;

const labelStyle = css`
  color: #ced2da;
  font-size: 1.2rem;
`;

const hostnameStyle = css`
  font-size: 1.5rem;
  font-weight: semi-bold;
`;

const TitleContainer = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #637083;
  border-radius: 0.5rem;
  margin-top: 3px;
  font-weight: bold;
`;

const GameNameWrapper = styled.div`
  text-align: center;
  padding: 1rem 0 1rem;
`;
