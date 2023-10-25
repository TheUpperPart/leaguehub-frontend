import authAPI from '@apis/authAPI';
import Icon from '@components/Icon';
import { MatchMessages, MatchPlayerScoreInfos } from '@components/RoundCheckIn';
import CallAdminChat from '@components/RoundCheckIn/CallAdminChat';
import styled from '@emotion/styled';
import { Client } from '@stomp/stompjs';
import { useRouter } from 'next/router';
import { ChangeEventHandler, MouseEventHandler, useEffect, useState } from 'react';

interface CheckInPageProps {
  ParticipantCheckin: () => void;
  client: Client | undefined;
  matchId: string;
  players: MatchPlayerScoreInfos[];
  matchMessages: MatchMessages[];
  requestUser: number;
  checkInUser: number[];
  currentMatchRound: number;
}

const CheckInPage = ({
  ParticipantCheckin,
  client,
  matchId,
  players,
  matchMessages,
  requestUser,
  checkInUser,
  currentMatchRound,
}: CheckInPageProps) => {
  const [ready, setReady] = useState<boolean>(false);
  const [isSendingRanking, setIsSendingRanking] = useState<boolean>(false);
  const [rank, setRank] = useState<string>('');

  const router = useRouter();
  const { channelLink } = router.query;

  const handleRankingChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    if (!e.target) return;
    setRank(e.target.value);
  };

  const participantAbstention: MouseEventHandler<HTMLElement> = async () => {
    if (!confirm('해당 경기를 기권하시겠습니까?')) return;
    const res = await authAPI({ method: 'post', url: `/api/${channelLink}/disqualification` });
    if (res.status === 200) {
      alert('정상적으로 기권처리 되었습니다.');
      return;
    }
    alert('서버 에러가 발생했습니다. 나중에 다시 처리해주세요');
  };

  const onClickRankingButton: MouseEventHandler<HTMLElement> = () => {
    if (rank === '') {
      alert('결과를 입력해주세요');
      return;
    }

    if (!confirm(`게임 결과 ${rank}등이 맞나요?`)) return;

    if (rank === '1' || rank === '2') {
      if (!client || currentMatchRound === -1) {
        alert('서버에 에러가 발생했습니다. 새로고침 후 입력 부탁드립니다');
        return;
      }

      client.publish({
        destination: `/app/match/${matchId}/${currentMatchRound}/score-update`,
      });
    }
    setIsSendingRanking(true);
  };

  useEffect(() => {
    const findUser = checkInUser.find((user) => requestUser === user);
    if (findUser === undefined) {
      setReady(false);
      return;
    }

    setReady(true);
  }, [checkInUser]);

  return (
    <Container>
      <RemainTimeWrapper>
        <Icon kind='clock' />
        <RemainTimeItem>남은시간</RemainTimeItem>
        <RemainTimeItem></RemainTimeItem>
      </RemainTimeWrapper>
      <ButtonWrapper>
        {players.length !== 0 && players.length <= checkInUser.length ? (
          <>
            <RankingSelect value={rank} onChange={handleRankingChange} disabled={isSendingRanking}>
              <option value=''>경기 후 게임 결과를 입력해주세요</option>
              {players.map((player, idx) => (
                <option key={idx} value={idx + 1}>
                  {idx + 1}등
                </option>
              ))}
            </RankingSelect>
            <RankingSubmitButton disabled={isSendingRanking} onClick={onClickRankingButton}>
              전송
            </RankingSubmitButton>
          </>
        ) : (
          <>
            <Button disabled={ready} onClick={() => ParticipantCheckin()}>
              준비
            </Button>
            <Button disabled={ready} onClick={participantAbstention}>
              기권
            </Button>
          </>
        )}
      </ButtonWrapper>

      <ChattingWrapper>
        <CallAdminChat
          client={client}
          matchId={matchId}
          players={players}
          matchMessages={matchMessages}
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
  background: ${(props) => (props.disabled ? '#ced4da' : '#637083')};
  border: none;
  border-radius: 0.5rem;

  &: hover {
    cursor: pointer;
  }
`;

const ChattingWrapper = styled.div``;

const RankingSelect = styled.select`
  height: 5rem;
  width: ${(props) => (props.disabled ? '100%' : '70%')};
`;

const RankingSubmitButton = styled.button`
  width: 26%;
  height: 5rem;
  color: white;
  background: #637083;
  border: none;
  border-radius: 0.5rem;
  display: ${(props) => (props.disabled ? 'none' : 'block')};

  &: hover {
    cursor: pointer;
  }
`;
