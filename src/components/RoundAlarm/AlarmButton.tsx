import { fetchRoundInfo, navigateToCheckInPage } from '@apis/match';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { CallAdmin } from '@type/admin';
import { useRouter } from 'next/router';
import AlarmButtonContent from './AlarmButtonContent';

interface Props {
  selectedRound: number;
  alarmInfo: CallAdmin | undefined;
}

const AlarmButton = ({ selectedRound, alarmInfo }: Props) => {
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ['groupList', selectedRound, router.query.channelLink as string],
    queryFn: () => fetchRoundInfo(router.query.channelLink as string, selectedRound),
  });

  const isMyGroupAlarm = () => {
    return selectedRound === alarmInfo?.matchRound;
  };

  return (
    <GroupGrid>
      {data?.matchInfoDtoList.map((match) => {
        return (
          <Button key={match.matchId}>
            <AlarmButtonContent matchName={match.matchName} matchId={match.matchId} />
            {(match.alarm || isMyGroupAlarm()) && <AlarmCircle />}
          </Button>
        );
      })}
    </GroupGrid>
  );
};

const GroupGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  background-color: ${({ theme }) => theme['bg-75']};
  border-radius: 1rem;
  overflow: hidden;
`;

const Button = styled.button`
  width: 100%;
  height: 7rem;
  padding: 1.5rem 2rem;

  position: relative;

  display: grid;
  grid-template-columns: 2rem 1fr 2.5rem;
  column-gap: 2rem;

  border: none;
  font-size: 1.6rem;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme['bg-75']};
  text-align: left;

  > svg {
    fill: ${({ theme }) => theme.text};
  }
`;

const AlarmCircle = styled.div`
  position: absolute;
  width: 0.8rem;
  height: 0.8rem;
  right: 1rem;
  top: calc(50% - 0.4rem);
  background-color: #c70039;
  border-radius: 0.4rem;
`;

export default AlarmButton;
