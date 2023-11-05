import authAPI from '@apis/authAPI';
import Icon from '@components/Icon';
import styled from '@emotion/styled';
import { BracketContents } from '@type/bracket';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Props {
  curRound: number;
  havingAlarm: boolean;
}

const RoundAlarmBody = ({ curRound, havingAlarm }: Props) => {
  const router = useRouter();

  const [roundInfo, setRoundInfo] = useState<BracketContents>();

  useEffect(() => {
    const getRoundInfo = async () => {
      try {
        const res = await authAPI({
          method: 'get',
          url: `/api/match/${router.query.channelLink as string}/${curRound}`,
        });

        setRoundInfo(res.data);
      } catch (error) {}
    };

    getRoundInfo();
  }, []);

  const moveToCheckIn = (matchId: number) => {
    authAPI({
      method: 'post',
      url: `/api/match/${router.query.channelLink as string}/${matchId}/call-off`,
    });

    router.push(`/contents/${router.query.channelLink as string}/checkIn/${matchId}`);
  };

  return (
    <Ground>
      {roundInfo?.matchInfoDtoList.map((match) => {
        return (
          <GroupContainer key={match.matchId} onClick={() => moveToCheckIn(match.matchId)}>
            <GroupTitle>{match.matchName}</GroupTitle>
            <Icon kind='shortcut' size={25} />

            {(match.alarm || havingAlarm) && <AlarmCircle />}
          </GroupContainer>
        );
      })}
    </Ground>
  );
};

const Ground = styled.div`
  margin: 2rem 0;
`;

const GroupContainer = styled.div`
  width: 15rem;
  height: 4rem;
  display: flex;
  align-items: center;
  border: 0.2rem solid #132043;

  justify-content: space-around;

  position: relative;

  cursor: pointer;
`;

const GroupTitle = styled.div`
  font-size: 2rem;
`;

const AlarmCircle = styled.div`
  position: absolute;
  width: 0.8rem;
  height: 0.8rem;
  right: 0.4rem;
  background-color: #c70039;
  border-radius: 0.4rem;
`;

export default RoundAlarmBody;
