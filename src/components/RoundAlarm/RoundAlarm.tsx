import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { fetchRoundListInfo } from '@apis/roundInfo';
import { useState } from 'react';
import AlarmContent from './AlarmContent';
import { CallAdmin } from '@type/admin';

type bracketStatus = 'PAST' | 'PRESENT' | 'FUTURE';
interface Props {
  alarmInfo: CallAdmin | undefined;
}

const RoundAlarm = ({ alarmInfo }: Props) => {
  const router = useRouter();

  const [selectedRound, setSelectedRound] = useState<number>(1);

  const { data } = useQuery({
    queryKey: ['groupList', router.query.channelLink as string],
    queryFn: () => fetchRoundListInfo(router.query.channelLink as string),
  });

  if (!data) {
    return <div>loading</div>;
  }

  return (
    <Container>
      <RoundGrid>
        {data.roundList.map((round) => (
          <>
            {data.liveRound > round && (
              <RoundContainer>
                <LeftLine status='PAST' />
                <Button status='PAST' onClick={() => setSelectedRound(round)}>
                  Round {round}
                  <ExplainText>
                    <svg
                      width='1.5rem'
                      height='1.5rem'
                      version='1.1'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                    >
                      <path d='M0 11l2-2 5 5 11-11 2 2-13 13z'></path>
                    </svg>
                    완료됨
                  </ExplainText>
                </Button>
              </RoundContainer>
            )}
            {data.liveRound === round && (
              <RoundContainer>
                <LeftLine status='PRESENT' />
                <Button status='PRESENT' onClick={() => setSelectedRound(round)}>
                  Round {round}
                  <ExplainText>
                    <svg
                      width='1.5rem'
                      height='1.5rem'
                      version='1.1'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                    >
                      <path d='M18 21.984v-6l-3.984-3.984 3.984-4.031v-5.953h-12v6l3.984 3.984-3.984 3.984v6h12zM8.016 7.5v-3.516h7.969v3.516l-3.984 3.984z'></path>
                    </svg>
                    진행 중...
                  </ExplainText>
                </Button>
              </RoundContainer>
            )}
            {data.liveRound < round && (
              <RoundContainer>
                <LeftLine status='FUTURE' />
                <Button status='FUTURE'>
                  Round {round}
                  <ExplainText>
                    <svg
                      width='1.5rem'
                      height='1.5rem'
                      version='1.1'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                    >
                      <path d='M18.984 18.984v-10.969h-13.969v10.969h13.969zM18.984 3q0.797 0 1.406 0.609t0.609 1.406v13.969q0 0.797-0.609 1.406t-1.406 0.609h-13.969q-0.844 0-1.43-0.586t-0.586-1.43v-13.969q0-0.797 0.586-1.406t1.43-0.609h0.984v-2.016h2.016v2.016h7.969v-2.016h2.016v2.016h0.984zM9.328 17.016l-1.078-1.078 2.438-2.438-2.438-2.438 1.078-1.078 2.438 2.438 2.438-2.438 1.031 1.078-2.438 2.438 2.438 2.438-1.031 1.078-2.438-2.438z'></path>
                    </svg>
                    대기 중...
                  </ExplainText>
                </Button>
              </RoundContainer>
            )}
          </>
        ))}
      </RoundGrid>
      <GroupContainer>
        {data && <AlarmContent selectedRound={selectedRound} alarmInfo={alarmInfo} />}
      </GroupContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;

  height: auto;
  column-gap: 2rem;
`;

const RoundGrid = styled.div`
  height: 100%;
  flex: 1;
  display: grid;
  grid-template-columns: 1fr;

  background-color: ${({ theme }) => theme['bg-75']};
  border-radius: 1rem;
  overflow: hidden;
`;

const RoundContainer = styled.div`
  display: flex;
  height: 7rem;
`;

const LeftLine = styled.div<{ status: bracketStatus }>`
  width: 0.5rem;
  height: 7rem;

  ${({ theme, status }) => status === 'PAST' && `background-color: ${theme.green};`}
  ${({ theme, status }) => status === 'PRESENT' && `background-color: ${theme.white};`}
  ${({ theme, status }) => status === 'FUTURE' && `background-color: ${theme.gray};`}
`;

const Button = styled.button<{ status: bracketStatus }>`
  width: calc(100% - 0.5rem);
  height: 7rem;
  padding: 1.5rem 2rem;

  border: none;
  font-size: 1.6rem;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  border-radius: 2rem;
  background-color: ${({ theme }) => theme['bg-75']};
  text-align: left;

  cursor: ${({ status }) => (status === 'FUTURE' ? 'not-allowed' : 'pointer')};

  > svg {
    fill: ${({ theme }) => theme.gray};
  }
`;

const ExplainText = styled.div`
  margin-top: 0.5rem;

  display: flex;
  align-items: center;
  column-gap: 1rem;
  font-size: 1.4rem;

  color: ${({ theme }) => theme.gray};
  > svg {
    fill: ${({ theme }) => theme.gray};
  }
`;

const GroupContainer = styled.div`
  flex: 1;
`;

export default RoundAlarm;
