import BoardBody from '@components/Sidebar/BoardBar/BoardBody';
import BoardFooter from '@components/Sidebar/BoardBar/BoardFooter';
import BoardHeader from '@components/Sidebar/BoardBar/BoardHeader';
import { SERVER_URL } from '@config/index';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { BoardInfo } from '@type/board';
import axios from 'axios';

const fetchData = async (channelId: string) => {
  const response = await axios.get<BoardInfo>(SERVER_URL + '/api/channel/' + channelId, {
    headers: {
      Authorization: 'User Token',
    },
  });
  return response.data;
};

const BoardBar = ({ channelId }: { channelId: string }) => {
  const { data } = useQuery(['getBoard', channelId], () => fetchData(channelId), {
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  return (
    <Container>
      {data && (
        <ContentContainer>
          <div>
            <BoardHeader
              hostname={data.hostName}
              leagueTitle={data.leagueTitle}
              game={data.game}
              participateNum={data.participateNum}
            />
            <BoardBody channels={data.channels} />
          </div>
        </ContentContainer>
      )}
      <FooterContainer>
        <BoardFooter channelId={channelId} />
      </FooterContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 24rem;
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
