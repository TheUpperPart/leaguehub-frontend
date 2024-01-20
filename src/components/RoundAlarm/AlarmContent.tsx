import { fetchRoundInfo, navigateToCheckInPage } from '@apis/match';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { CallAdmin } from '@type/admin';
import { useRouter } from 'next/router';

interface Props {
  selectedRound: number;
  alarmInfo: CallAdmin | undefined;
}

const AlarmContent = ({ selectedRound, alarmInfo }: Props) => {
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ['groupList', selectedRound, router.query.channelLink as string],
    queryFn: () => fetchRoundInfo(router.query.channelLink as string, selectedRound),
  });

  const isMyGroupAlarm = () => {
    return selectedRound === alarmInfo?.matchRound;
  };

  const moveToGroup = (matchId: number) => {
    navigateToCheckInPage(router.query.channelLink as string, matchId);
    router.push(`/contents/${router.query.channelLink as string}/checkIn/${matchId}`);
  };

  return (
    <GroupGrid>
      {data?.matchInfoDtoList.map((match) => {
        return (
          <Button key={match.matchId}>
            <svg
              width='2rem'
              height='2rem'
              version='1.1'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 30 28'
            >
              <path d='M9.266 14c-1.625 0.047-3.094 0.75-4.141 2h-2.094c-1.563 0-3.031-0.75-3.031-2.484 0-1.266-0.047-5.516 1.937-5.516 0.328 0 1.953 1.328 4.062 1.328 0.719 0 1.406-0.125 2.078-0.359-0.047 0.344-0.078 0.688-0.078 1.031 0 1.422 0.453 2.828 1.266 4zM26 23.953c0 2.531-1.672 4.047-4.172 4.047h-13.656c-2.5 0-4.172-1.516-4.172-4.047 0-3.531 0.828-8.953 5.406-8.953 0.531 0 2.469 2.172 5.594 2.172s5.063-2.172 5.594-2.172c4.578 0 5.406 5.422 5.406 8.953zM10 4c0 2.203-1.797 4-4 4s-4-1.797-4-4 1.797-4 4-4 4 1.797 4 4zM21 10c0 3.313-2.688 6-6 6s-6-2.688-6-6 2.688-6 6-6 6 2.688 6 6zM30 13.516c0 1.734-1.469 2.484-3.031 2.484h-2.094c-1.047-1.25-2.516-1.953-4.141-2 0.812-1.172 1.266-2.578 1.266-4 0-0.344-0.031-0.688-0.078-1.031 0.672 0.234 1.359 0.359 2.078 0.359 2.109 0 3.734-1.328 4.062-1.328 1.984 0 1.937 4.25 1.937 5.516zM28 4c0 2.203-1.797 4-4 4s-4-1.797-4-4 1.797-4 4-4 4 1.797 4 4z'></path>
            </svg>
            <ExplainContainer>
              <Text>{match.matchName}</Text>
              <TextGray>진행 중...</TextGray>
            </ExplainContainer>
            <AlarmContainer>
              <svg
                onClick={() => moveToGroup(match.matchId)}
                width='2.5rem'
                height='2.5rem'
                version='1.1'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
              >
                <path d='M8.578 16.594l4.594-4.594-4.594-4.594 1.406-1.406 6 6-6 6z'></path>
              </svg>
              {(match.alarm || isMyGroupAlarm()) && <AlarmCircle />}
            </AlarmContainer>
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

  display: grid;
  grid-template-columns: 2rem 1fr 2.5rem;
  column-gap: 2rem;

  border-radius: 2rem;
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

const ExplainContainer = styled.div``;

const AlarmContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 4rem;

  cursor: pointer;
  > svg {
    fill: ${({ theme }) => theme.gray};
  }
`;

const AlarmCircle = styled.div`
  position: absolute;
  width: 0.8rem;
  height: 0.8rem;
  right: -1rem;
  background-color: #c70039;
  border-radius: 0.4rem;
`;

const Text = styled.div`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.text};
`;

const TextGray = styled.div`
  margin-top: 0.5rem;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.gray};
`;

export default AlarmContent;
