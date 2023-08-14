import { useQuery } from '@tanstack/react-query';
import styled from '@emotion/styled';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import BoardBody from '@components/Sidebar/BoardBar/BoardBody';
import BoardFooter from '@components/Sidebar/BoardBar/BoardFooter';
import BoardHeader from '@components/Sidebar/BoardBar/BoardHeader';
import { SERVER_URL } from '@config/index';
import useBoardIdLists from '@hooks/useBoardIdLists';
import { BoardInfo } from '@type/board';

const fetchData = async (channelLink: string) => {
  const res1 = await axios.get<Omit<BoardInfo, 'channels'>>(
    SERVER_URL + '/api/channel/' + channelLink,
    {
      headers: {
        Authorization: 'User Token',
      },
    },
  );

  const res2 = await axios.get<Pick<BoardInfo, 'channels'>>(
    SERVER_URL + '/api/channel/' + channelLink + '/boards',
    {
      headers: {
        Authorization: 'User Token',
      },
    },
  );

  const res: BoardInfo = { ...res1.data, ...res2.data };

  return res;
};

const BoardBar = ({ channelLink }: { channelLink: string }) => {
  const router = useRouter();

  const { lastVisitedBoardIdLists, handleBoard } = useBoardIdLists();

  const { data, isSuccess } = useQuery(['getBoard', channelLink], () => fetchData(channelLink), {
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  useEffect(() => {
    const lastBoardId = lastVisitedBoardIdLists[channelLink]?.boardId;

    if (lastBoardId) {
      router.push(`/contents/${channelLink}/${lastBoardId}`);
      return;
    }

    if (isSuccess) {
      router.push(`/contents/${channelLink}/${data.channels[0].id}`);
      handleBoard(channelLink, data.channels[0].id);
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
          <BoardBody channelLink={channelLink} boards={data.channels} />
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
