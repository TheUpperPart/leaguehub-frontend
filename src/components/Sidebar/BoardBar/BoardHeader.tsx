import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface BoardHeaderProps {
  hostname: string;
  leagueTitle: string;
  game: string;
  participateNum: number;
}

const BoardHeader = ({ hostname, leagueTitle, game, participateNum }: BoardHeaderProps) => {
  return (
    <Container>
      <p>개최자 </p>
      {hostname}
      <div>{leagueTitle}</div>
      <div
        css={css`
          margin: 0 auto;
        `}
      >
        {game}
      </div>
      <div>{participateNum}</div>
    </Container>
  );
};

export default BoardHeader;

const Container = styled.div``;
