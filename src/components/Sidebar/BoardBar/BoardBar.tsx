import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import axios from 'axios';

import useLastVisitedBoardLists from '@hooks/useLastVisitedBoardLists';
import BoardFooter from '@components/Sidebar/BoardBar/BoardFooter';
import BoardHeader from '@components/Sidebar/BoardBar/BoardHeader';
import BoardBody from '@components/Sidebar/BoardBar/BoardBody';
import { SERVER_URL } from '@config/index';
import { BoardInfo } from '@type/board';

const fetchData = async (channelId: string) => {
  const res1 = await axios.get<Omit<BoardInfo, 'channels'>>(
    SERVER_URL + '/api/channel/' + channelId,
    {
      headers: {
        Authorization: 'User Token',
      },
    },
  );

  const res2 = await axios.get<Pick<BoardInfo, 'channels'>>(
    SERVER_URL + '/api/channel/' + channelId + '/boards',
    {
      headers: {
        Authorization: 'User Token',
      },
    },
  );

  const res: BoardInfo = { ...res1.data, ...res2.data };

  return res;
};

const BoardBar = ({ channelId }: { channelId: string }) => {
  const router = useRouter();

  const { lastVisitedBoardIdLists, handleBoard } = useLastVisitedBoardLists();

  const { data, isSuccess } = useQuery(['getBoard', channelId], () => fetchData(channelId), {
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  useEffect(() => {
    const lastBoardId = lastVisitedBoardIdLists[channelId]?.boardId;

    if (lastBoardId) {
      router.push(`/contents/${channelId}/${lastBoardId}`);
      return;
    }

    if (isSuccess) {
      router.push(`/contents/${channelId}/${data.channels[0].id}`);
      handleBoard(channelId, data.channels[0].id);
    }
  }, [data]);

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
          <BoardBody channelId={channelId} boards={data.channels} />
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
