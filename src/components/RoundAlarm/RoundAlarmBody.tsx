import authAPI from '@apis/authAPI';
import Icon from '@components/Icon';
import styled from '@emotion/styled';
import { BracketContents } from '@type/bracket';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { CallAdmin } from '@type/admin';

interface Props {
  curRound: number;
  alramInfo: CallAdmin | undefined;
}

const RoundAlarmBody = ({ curRound, alramInfo }: Props) => {
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
  }, [router.query.channelLink as string]);

  const moveToCheckIn = (matchId: number) => {
    authAPI({
      method: 'post',
      url: `/api/match/${router.query.channelLink as string}/${matchId}/call-off`,
    });

    router.push(`/contents/${router.query.channelLink as string}/checkIn/${matchId}`);
  };

  const isMySelfAlarm = () => {
    return curRound === alramInfo?.matchRound;
  };

  console.log(roundInfo);

  return (
    <Ground>
      {roundInfo?.matchInfoDtoList.map((match) => {
        return (
          <GroupContainer key={match.matchId} onClick={() => moveToCheckIn(match.matchId)}>
            <GroupTitle>{match.matchName}</GroupTitle>
            <AlarmContainer>
              <Icon kind='shortcut' size={25} />

              {(match.alarm || isMySelfAlarm()) && <AlarmCircle />}
            </AlarmContainer>
          </GroupContainer>
        );
      })}
    </Ground>
  );
};

const Ground = styled.div`
  margin: 2rem 0;
  display: grid;
  grid-template-columns: repeat(4, 15rem);
  column-gap: 2rem;
  row-gap: 2rem;
`;

const GroupContainer = styled.div`
  width: 15rem;
  height: 7rem;
  display: flex;
  align-items: center;

  background-color: #f3f3f3;
  border: 0.2rem solid #132043;
  border-radius: 3rem;

  justify-content: space-around;

  position: relative;

  cursor: pointer;
`;

const GroupTitle = styled.div`
  font-size: 2rem;
  line-height: 2rem;
  display: flex;
  align-items: center;
`;

const AlarmContainer = styled.div`
  display: flex;
  align-items: center;
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
