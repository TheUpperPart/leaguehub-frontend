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
        <div>
          <BoardHeader
            hostname={data.hostName}
            leagueTitle={data.leagueTitle}
            game={data.game}
            participateNum={data.participateNum}
          />
        </div>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 22rem;
  height: 100vh;
  background-color: #202b37;
  overflow: auto;
  padding: 1%;
`;

export default BoardBar;
