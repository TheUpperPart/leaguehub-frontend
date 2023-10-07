import Icon from '@components/Icon';
import { MatchMessages, MatchPlayerScoreInfos } from '@components/RoundCheckIn';
import CallAdminChat from '@components/RoundCheckIn/CallAdminChat';
import styled from '@emotion/styled';
import { Client } from '@stomp/stompjs';

interface CheckInPageProps {
  ParticipantCheckin: () => void;
  client: Client | undefined;
  matchId: string;
  players: MatchPlayerScoreInfos[];
  matchMessage: MatchMessages[];
  requestUser: number;
}

const CheckInPage = ({
  ParticipantCheckin,
  client,
  matchId,
  players,
  matchMessage,
  requestUser,
}: CheckInPageProps) => {
  return (
    <Container>
      <RemainTimeWrapper>
        <Icon kind='clock' />
        <RemainTimeItem>남은시간</RemainTimeItem>
        <RemainTimeItem>04:59</RemainTimeItem>
      </RemainTimeWrapper>
      <ButtonWrapper>
        <Button onClick={() => ParticipantCheckin()}>준비</Button>
        <Button>기권</Button>
      </ButtonWrapper>
      <ChattingWrapper>
        <CallAdminChat
          client={client}
          matchId={matchId}
          players={players}
          matchMessage={matchMessage}
          requestUser={requestUser}
        />
      </ChattingWrapper>
    </Container>
  );
};

export default CheckInPage;

const Container = styled.div`
  width: 30%;
  padding: 0 2rem 0 2rem;
`;

const RemainTimeWrapper = styled.div`
  display: flex;
  width: 100%;
  border-radius: 0.5rem;
  background: #202b37;
  color: white;
  height: 5rem;
  padding: 1rem;
  font-size: 1.3rem;
  align-items: center;
  margin-bottom: 1rem;
`;

const RemainTimeItem = styled.div`
  padding-left: 0.3rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  width: 48%;
  height: 5rem;
  color: white;
  background: #637083;
  border: none;
  border-radius: 0.5rem;

  &: hover {
    cursor: pointer;
  }
`;

const ChattingWrapper = styled.div``;