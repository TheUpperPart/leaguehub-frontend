import { useQuery } from '@tanstack/react-query';
import styled from '@emotion/styled';

import BoardFooter from '@components/Sidebar/BoardBar/BoardFooter';
import BoardHeader from '@components/Sidebar/BoardBar/BoardHeader';
import BoardBody from '@components/Sidebar/BoardBar/BoardBody';
import { BoardInfo } from '@type/board';
import authAPI from '@apis/authAPI';
import { useEffect } from 'react';
import useChannels from '@hooks/useChannels';

const fetchData = async (channelLink: string) => {
  const res = await authAPI<BoardInfo>({ method: 'get', url: '/api/channel/' + channelLink });

  return res.data;
};

const BoardBar = ({ channelLink }: { channelLink: string }) => {
  const { data } = useQuery(['getBoard', channelLink], () => fetchData(channelLink), {
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  const updateChannelData = (leagueTitle: string, maxPlayer: number) => {
    if (!data) return;
    data.leagueTitle = leagueTitle;
    data.maxPlayer = maxPlayer;
  };

  const { setCurrentChannel, setChannelPermission } = useChannels();

  useEffect(() => {
    setCurrentChannel(channelLink);
    setChannelPermission(data?.permission);
  }, [data]);

  return (
    <Container>
      {data && (
        <>
          <ContentContainer>
            <BoardHeader
              hostname={data.hostName}
              leagueTitle={data.leagueTitle}
              gameCategory={data.gameCategory}
              participateNum={data.currentPlayer}
            />
            <BoardBody channelLink={channelLink} />
          </ContentContainer>
          <FooterContainer>
            <BoardFooter
              channelLink={channelLink}
              leagueTitle={data.leagueTitle}
              maxPlayer={data.maxPlayer}
              updateChannelData={updateChannelData}
            />
          </FooterContainer>
        </>
      )}
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
