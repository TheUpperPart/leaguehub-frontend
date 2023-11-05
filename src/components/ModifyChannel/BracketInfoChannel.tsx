import authAPI from '@apis/authAPI';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { MatchCountList } from '@type/channelConfig';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const fetchInitialMatchCount = async (channelLink: string) => {
  const res = await authAPI<MatchCountList>({
    method: 'get',
    url: `/api/match/${channelLink}/count`,
  });
  return res.data;
};

const BracketInfoChannel = () => {
  const router = useRouter();

  const [roundInfo, setRoundInfo] = useState<number[]>();

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['matchCount', router.query.channelLink as string],
    queryFn: () => fetchInitialMatchCount(router.query.channelLink as string),
    cacheTime: 0,
    staleTime: 0,
  });

  const handleRoundInfo = (e: React.ChangeEvent<HTMLSelectElement>, roundIndex: number) => {
    const changeRoundInfoArr = roundInfo?.map((ele, index) =>
      index === roundIndex ? Number(e.target.value) : ele,
    );

    setRoundInfo(changeRoundInfoArr);
  };

  const updateRoundMatchCount = async () => {
    if (!roundInfo) {
      return;
    }

    try {
      const res = await authAPI({
        method: 'post',
        url: `/api/match/${router.query.channelLink as string}/count`,
        data: {
          matchSetCountList: [...roundInfo].reverse(),
        },
      });

      alert('수정이 완료되었습니다!');
    } catch (error) {
      console.log(error);
      alert('이미 시작된 경기는 재 배정할 수 없습니다.');
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setRoundInfo([...data?.matchSetCountList].reverse());
    }
  }, [data]);

  if (isLoading) {
    return <div>로딩 중</div>;
  }

  if (isError) {
    return <div>에러</div>;
  }

  return (
    <Container>
      <Header>라운드 수정</Header>
      <Content>
        {isLoading && <div>로딩 중</div>}
        {isError && <div>Error</div>}
        {roundInfo?.reverse().map((currentMatchCount, index) => {
          return (
            <RoundInfo key={index}>
              <RoundInfoHeader>Round {index + 1}</RoundInfoHeader>
              <select
                onChange={(e) => handleRoundInfo(e, index)}
                defaultValue={String(currentMatchCount)}
              >
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
              </select>
            </RoundInfo>
          );
        })}
        <ButtonWrapper>
          <ModifyButton onClick={updateRoundMatchCount}>수정완료</ModifyButton>
        </ButtonWrapper>
      </Content>
    </Container>
  );
};

export default BracketInfoChannel;

const Container = styled.div`
  margin: 2rem 4rem;
`;

const Header = styled.div`
  text-align: left;

  font-size: 3rem;
  font-weight: 900;
  color: white;
`;

const Content = styled.div``;

const RoundInfo = styled.div`
  height: 7rem;
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const RoundInfoHeader = styled.div`
  font-size: 2rem;
  color: white;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const ModifyButton = styled.button`
  width: 10rem;
  height: 6rem;
  background-color: #344051;
  border: none;
  border-radius: 0.5rem;
  color: white;
  margin: 0 6rem 0 6rem;

  cursor: pointer;

  font-size: 1.8rem;
`;
