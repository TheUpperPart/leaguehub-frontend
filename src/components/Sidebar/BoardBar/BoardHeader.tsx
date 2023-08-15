import Icon from '@components/Icon';
import { GameEnum } from '@constants/MakeGame';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface BoardHeaderProps {
  hostname: string;
  leagueTitle: string;
  gameCategory: number;
  participateNum: number;
}

const BoardHeader = ({ hostname, leagueTitle, gameCategory, participateNum }: BoardHeaderProps) => {
  return (
    <Container>
      <Wrapper>
        <span css={labelStyle}>개최자 </span>
        <span css={hostnameStyle}>{hostname}</span>
        <TitleContainer>{leagueTitle}</TitleContainer>
        <GameNameWrapper>{GameEnum[gameCategory]}</GameNameWrapper>
      </Wrapper>
      <ParticipateWrapper>
        <span>참여자(팀)</span>
        <ParticipateBox>
          <Icon kind='team' color='#637083' size='2rem' />
          {participateNum}
        </ParticipateBox>
      </ParticipateWrapper>
    </Container>
  );
};

export default BoardHeader;

const Container = styled.div`
  padding: 1.4rem;
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

const ParticipateWrapper = styled.div`
  padding: 1rem 0 1rem;
  border-bottom: solid 1px #344051;
`;

const ParticipateBox = styled.div`
  background-color: #344051;
  padding: 1rem 1rem 1rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.5rem;
  margin: 1rem 0 1rem;
`;
