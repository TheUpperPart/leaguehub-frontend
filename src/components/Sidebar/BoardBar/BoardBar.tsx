import { useQuery } from '@tanstack/react-query';
import styled from '@emotion/styled';

import BoardFooter from '@components/Sidebar/BoardBar/BoardFooter';
import BoardHeader from '@components/Sidebar/BoardBar/BoardHeader';
import BoardBody from '@components/Sidebar/BoardBar/BoardBody';
import { BoardInfo } from '@type/board';
import authAPI from '@apis/authAPI';

const fetchData = async (channelLink: string) => {
  const res = await authAPI<BoardInfo>({ method: 'get', url: '/api/channel/' + channelLink });

  return res.data;
};

const BoardBar = ({ channelLink }: { channelLink: string }) => {
  const { data } = useQuery(['getBoard', channelLink], () => fetchData(channelLink), {
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  return (
    <Container>
      {data && (
        <ContentContainer>
          <BoardHeader
            hostname={data.hostName}
            leagueTitle={data.leagueTitle}
            game={data.game}
            participateNum={data.currentPlayer}
          />
          <BoardBody channelLink={channelLink} />
        </ContentContainer>
      )}
      <FooterContainer>
        <BoardFooter channelLink={channelLink} />
      </FooterContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 20rem;
  height: 100vh;
  background-color: #202b37;
  overflow: auto;
  position: relative;
`;

const ContentContainer = styled.div`
  height: 96%;
  padding-bottom: 3rem;
`;

const FooterContainer = styled.div`
  position: sticky;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3rem;
`;

export default BoardBar;
