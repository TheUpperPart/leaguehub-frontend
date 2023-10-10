import authAPI from '@apis/authAPI';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { BracketHeader } from '@type/bracket';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';

type bracketStatus = 'DONE' | 'READY' | 'BAN';

const fetchAllBracket = async (channelLink: string) => {
  const res = await authAPI<BracketHeader>({
    method: 'get',
    url: `/api/match/${channelLink}`,
  });

  console.log(res);

  return res.data;
};

const AssignBracket = () => {
  const router = useRouter();

  const { data, isSuccess } = useQuery<BracketHeader>(['bracketSetting'], () => {
    return fetchAllBracket(router.query.channelLink as string);
  });

  const fetchSetBracket = async (round: number) => {
    if (window.confirm(`Round ${round}를 배정하시겠습니까?`)) {
      try {
        const res = await authAPI({
          method: 'post',
          url: `/api/match/${router.query.channelLink as string}/${round}`,
        });

        if (isSuccess) {
          data.liveRound = round;
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          window.alert(error.response?.data.message);
        }
      }
    }
  };

  return (
    <Container>
      {data?.roundList.map((round) => {
        return (
          <Bracket>
            <BracketHeader>Round {round}</BracketHeader>
            {round === data.liveRound && <BracketButton status='DONE'>배정 완료</BracketButton>}
            {round === data.liveRound + 1 && (
              <BracketButton status='READY' onClick={() => fetchSetBracket(round)}>
                배정하기
              </BracketButton>
            )}
            {round > data.liveRound + 1 && <BracketButton status='BAN'>배정 불가</BracketButton>}
          </Bracket>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  margin: 2rem 1rem;
`;

const Bracket = styled.div`
  display: flex;
  align-items: center;

  column-gap: 2rem;

  margin: 2rem 0;
`;

const BracketHeader = styled.div`
  font-size: 1.6rem;

  color: white;
`;

const BracketButton = styled.button<{ status: bracketStatus }>`
  width: 12rem;
  height: 4rem;
  border: none;
  padding: 0;
  margin: 0;

  font-size: 1.6rem;
  color: white;

  ${(prop) =>
    prop.status === 'DONE' &&
    `
    background-color : #7C81AD;
    cursor: not-allowed;
  `}

  ${(prop) =>
    prop.status === 'READY' &&
    `
    background-color : #1AACAC;
    cursor: pointer;
  `}

  ${(prop) =>
    prop.status === 'BAN' &&
    `
    background-color : #FF6969;
    cursor: not-allowed
  `}
`;

export default AssignBracket;
