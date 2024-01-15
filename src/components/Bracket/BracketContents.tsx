import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import styled from '@emotion/styled';
import Image from 'next/image';
import { fetchBracketContents } from '@apis/bracketContents';

interface Props {
  curRound: number;
}

const BracketContents = (props: Props) => {
  const router = useRouter();

  const { data, isSuccess, isError, isLoading } = useQuery({
    queryKey: ['bracketContents', props.curRound, router.query.channelLink],
    queryFn: () => fetchBracketContents(router.query.channelLink as string, props.curRound),
  });

  const moveToCheckIn = (matchId: number) => {
    router.push(`/contents/${router.query.channelLink as string}/checkIn/${matchId}`);
  };

  return (
    <Container>
      <Header></Header>
      <Content>
        {data?.matchInfoDtoList.map((match) => {
          return (
            <MatchContainer>
              <MatchHeader>
                <MatchHeaderRound>M{match.matchCurrentSet}</MatchHeaderRound>
                <MatchHeaderName>{match.matchName}</MatchHeaderName>
                <MatchHeaderMore onClick={() => moveToCheckIn(match.matchId)}>
                  자세히
                </MatchHeaderMore>
              </MatchHeader>
              <MatchContent>
                {match.matchPlayerInfoList.length === 0 ? (
                  <MatchNoGame>아직 대진표가 생성되지 않았어요 :(</MatchNoGame>
                ) : (
                  match.matchPlayerInfoList
                    .sort((a, b) => b.score - a.score)
                    .map((user) => {
                      return (
                        <UserContainer myself={user.gameId === data.myGameId}>
                          <UserImgContainer>
                            {user.profileSrc ? (
                              <UserImg src={user.profileSrc} alt='profile' width={30} height={30} />
                            ) : (
                              <UserNameImg>
                                <UserNameImgText>{user.gameId.substring(0, 2)}</UserNameImgText>
                              </UserNameImg>
                            )}
                          </UserImgContainer>

                          <UserName>{user.gameId}</UserName>
                          <UserScore>{user.score}</UserScore>
                        </UserContainer>
                      );
                    })
                )}
              </MatchContent>
            </MatchContainer>
          );
        })}
      </Content>
    </Container>
  );
};

export default BracketContents;

const Container = styled.div``;

const Header = styled.div``;

const Content = styled.div`
  position: relative;

  display: grid;

  max-width: 100rem;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 2rem;
  row-gap: 1rem;
`;

const MatchContainer = styled.div`
  width: 22rem;
  height: 40rem;
  border: 1px solid black;

  border-radius: 0.4rem;
`;

const MatchHeader = styled.div`
  background-color: #344051;
  color: #ffffff;
  text-align: center;

  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;

  padding: 0 1rem;

  height: 3rem;
  font-size: 1.6rem;
`;

const MatchHeaderRound = styled.div`
  position: absolute;
  top: 0.2rem;
  left: 0.5rem;

  border: 0.1rem solid #ffffff;
  height: 2.6rem;
  width: 2.6rem;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 0.5rem;

  background-color: #141c24;
  color: #ffffff;
  font-weight: 600;
  font-size: 1.2rem;
`;

const MatchHeaderName = styled.div`
  text-align: center;
  font-weight: 900;
  font-size: 1.8rem;
  line-height: 1.8rem;
`;

const MatchHeaderMore = styled.div`
  position: absolute;
  top: 0.2rem;
  right: 0.5rem;

  height: 2.6rem;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 0.5rem;

  color: #ffffff;
  font-weight: 7000;
  font-size: 1.2rem;

  cursor: pointer;
`;

const MatchContent = styled.div`
  height: 37rem;
  padding: 1rem 0.5rem;

  display: grid;
  grid-template-rows: repeat(8, 1fr);
  justify-content: center;

  row-gap: 0.5rem;

  flex-direction: column;
`;

const MatchNoGame = styled.div`
  height: 35rem;
  width: 21rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #b4b4b3;
  opacity: 0.6;

  font-size: 1.8 rem;
  color: black;
`;

const UserContainer = styled.div<{ myself: boolean }>`
  width: 20rem;
  display: grid;
  grid-template-columns: 3rem 1fr 3rem;
  padding: 0 1rem;

  column-gap: 1rem;

  align-items: center;
  justify-content: center;
  border: 1px solid black;

  background-color: ${(prop) => (prop.myself ? 'gray' : 'white')};
  border-radius: 0.4rem;

  &:hover {
    background-color: gray;
  }

  cursor: pointer;
`;

const UserImgContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
`;
const UserImg = styled(Image)`
  border-radius: 0.5rem;
`;
const UserNameImg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
`;

const UserNameImgText = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  background-color: antiquewhite;
`;

const UserName = styled.div``;
const UserScore = styled.div`
  width: 3rem;
  height: 3rem;
  border: 0.2rem solid black;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
